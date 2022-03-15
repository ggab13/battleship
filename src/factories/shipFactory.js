function createShip(length) {
  const shipLength = length;
  let life = length;
  const position = [];
  const shipCoordinates = [];

  for (let index = 0; index < shipLength; index += 1) {
    position.push('');
  }

  return {
    isSunk() {
      return (life === 0);
    },
    hit() {
      life -= 1;
    },
    status() {
      return position;
    },
    life() {
      return life;
    },
    parseShipCoordinates(x, y) {
      shipCoordinates.push({ x, y });
    },
    getShipCoordinates() {
      return shipCoordinates;
    },
  };
}

module.exports = createShip;
