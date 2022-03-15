const createShip = require('../factories/shipFactory');

test('Ship creation works', () => {
  const hajo = createShip(5);
  expect(hajo.life()).toStrictEqual(5);
});

test('Hit one time', () => {
  const hajo = createShip(3);
  hajo.hit();
  expect(hajo.life()).toStrictEqual(2);
});

test('Ship is sunk', () => {
  const hajo = createShip(3);
  hajo.hit(0);
  hajo.hit(1);
  hajo.hit(2);
  expect(hajo.isSunk()).toBe(true);
});
