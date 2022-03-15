const Gameboard = require('./gameBoardFactory');

test('Place ship on gameboard', () => {
  const test = Gameboard();
  test.placeShip(3, 3, 3, 'horizontal');
  const testingCoordinates = test.getCoordinates();
  expect(testingCoordinates[3][3]).toStrictEqual('ship');
});

test('Hit ship on x:3 y:3 position', () => {
  const test = Gameboard();
  test.placeShip(3, 3, 3, 'horizontal');
  const testingCoordinates = test.getCoordinates();
  test.receiveAttack(3, 3);
  expect(testingCoordinates[3][3]).toStrictEqual('hit');
});

test('Miss ship on x:3 y:3 position if there is no ship', () => {
  const test = Gameboard();
  const testingCoordinates = test.getCoordinates();
  test.receiveAttack(3, 3);
  expect(testingCoordinates[3][3]).toStrictEqual('miss');
});

test('Check if all ship sunk', () => {
  const test = Gameboard();

  test.placeShip(3, 3, 3, 'horizontal');
  test.placeShip(2, 2, 2, 'horizontal');
  test.receiveAttack(3, 3);
  test.receiveAttack(3, 4);
  test.receiveAttack(3, 5);

  test.receiveAttack(2, 2);
  test.receiveAttack(2, 3);

  expect(test.allShipsSunk()).toBe(true);
});
