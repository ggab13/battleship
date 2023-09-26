import createPlayer from './factories/playerFactory';

function Game() {
  const Gabor = createPlayer('Gabor');
  const AI = createPlayer('Odin - AI');

  Gabor.playerPlaceShips(1, 1, 1, 'horizontal');
  Gabor.playerPlaceShips(2, 2, 3, 'vertical');
  Gabor.playerPlaceShips(3, 4, 5, 'horizontal');
  Gabor.playerPlaceShips(4, 6, 6, 'vertical');
  Gabor.playerPlaceShips(5, 9, 1, 'horizontal');

  AI.playerPlaceShips(1, 1, 1, 'horizontal');
  Gabor.attack(1, 1, AI.gameboard);
  AI.aiAttack(Gabor.gameboard);
  AI.aiAttack(Gabor.gameboard);
  AI.aiAttack(Gabor.gameboard);
  AI.aiAttack(Gabor.gameboard);
  AI.aiAttack(Gabor.gameboard);


}
export default Game;
