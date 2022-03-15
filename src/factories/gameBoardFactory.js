const _ = require('lodash');
const createShip = require('./shipFactory');

function Gameboard() {
  const coordinates = new Array(10).fill().map(() => Array(10).fill());
  const shipArray = [];
  const receivedShots = [];
  const missedShots = [];

  function shipType(length) {
    let type;
    if (length === 1) {
      type = 'Fishing boat';
    }
    if (length === 2) {
      type = 'Destroyer';
    }
    if (length === 3) {
      type = 'Submarine';
    }
    if (length === 4) {
      type = 'Battleship';
    }
    if (length === 5) {
      type = 'Carrier';
    }
    return type;
  }
  // Place ship on board based on align
  function shipCoordinates(horizontalOrVertical, x, y, index, length, ship) {
    const currentShip = ship;
    if (horizontalOrVertical === 'horizontal') {
      coordinates[x][y + index] = 'ship';
      currentShip.parseShipCoordinates(x, (y + index));
    }
    if (horizontalOrVertical === 'vertical') {
      coordinates[x + index][y] = 'ship';
      currentShip.parseShipCoordinates((x + index), y);
    }
  }

  // Storing coordinates of the ships
  function storeCoordinate(x, y, array) {
    array.push({
      x,
      y,
    });
  }

  function getItem(item) {
    return item;
  }
  // Get all the ships back
  function getAllShips() {
    return shipArray.map(getItem);
  }

  // This is a function which is going through all of the ship arrays, and try to find a match for
  // the received coordinate and based on that makes the needed step.
  function receiveAttack(x, y) {
    const target = { x, y };
    if (coordinates[x][y] === 'ship') {
      storeCoordinate(x, y, receivedShots);
      coordinates[x][y] = 'hit';
      for (let index = 0; index < getAllShips().length; index += 1) {
        const element = getAllShips()[index];

        const elementCoordinates = element.getShipCoordinates();
        // console.log(element.getShipCoordinates()[0]);
        // console.log(vizsgalat);

        for (let indexx = 0; indexx < elementCoordinates.length; indexx += 1) {
          const currntElement = elementCoordinates[indexx];
          if (_.isEqual(currntElement, target)) {
            element.hit();
          }
        }
      }
    } else if (coordinates[x][y] === 'miss') {
      return false;
    } else {
      storeCoordinate(x, y, missedShots);
      coordinates[x][y] = 'miss';
    }
  }

  // Check if ship is sunk
  function shipSunk(ship) {
    let sunk;
    if (ship.isSunk() === true) {
      sunk = true;
    }
    return sunk;
  }

  // Check if all ships are sunk
  function allShipsSunk() {
    return getAllShips().every(shipSunk);
  }

  // Place ship on the matrix
  function placeShip(length, x, y, horizontalOrVertical) {
    const ship = createShip(length);

    for (let index = 0; index < length; index += 1) {
      shipCoordinates(horizontalOrVertical, x, y, index, length, ship);
    }

    shipArray.push(ship);
  }

  return {

    placeShip,
    getCoordinates() {
      return coordinates;
    },
    receiveAttack,
    getShips() {
      return shipArray;
    },
    getmissedshtos() {
      return missedShots;
    },
    getReceivedShots() {
      return receivedShots;
    },
    getAllShips,
    allShipsSunk,

  };
}
module.exports = Gameboard;
