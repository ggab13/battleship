const _ = require('lodash');
const Gameboard = require('./gameBoardFactory');

function createPlayer(name) {
  const playerName = name;
  const gameboard = Gameboard();
  const ships = [];
  const aiCoordinates = [{ x: 1, y: 1 }];

  // Function for placing ships for player
  function playerPlaceShips(length, x, y, alignment) {
    const element = gameboard.placeShip(length, x, y, alignment);
    ships.push(element);
  }

  // Attack function
  // const attack = (y, x, gameboard) => gameboard.receiveAttack(x, y);
  function attack(y, x, enemyGameboard) {
    enemyGameboard.receiveAttack(x, y);
  }
  function aiAttack(enemyGameboard) {
    const x = Math.floor(Math.random() * 9) + 1;
    const y = Math.floor(Math.random() * 9) + 1;
    /*  for (let index = 0; index < aiCoordinates.length; index++) {
      const element = aiCoordinates[index];

      console.log(element);
    } */
    const found = aiCoordinates.some((item) => item.x === x && item.y === y);
    if (found) {
      console.log('This coordinate is taken, so will use function again');
      aiAttack(enemyGameboard);
    } else {
      aiCoordinates.push({
        x,
        y,
      });
      console.log(x, y);

      enemyGameboard.receiveAttack(x, y);
    }
  }
  return {
    attack, gameboard, playerPlaceShips, playerName, aiAttack,
  };
}

export default createPlayer;
