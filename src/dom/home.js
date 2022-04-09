import createPlayer from '../factories/playerFactory';
import '../styles.scss';
import { createBoard, createComponent } from './components';

const app = document.querySelector('#app');
const container = createComponent('div', 'container', app);
const header = createComponent('header', 'header', container);
const main = createComponent('main', 'game', container);
const footer = createComponent('footer', 'footer', container);
const player = createComponent('div', 'player', main);
const ai = createComponent('div', 'ai', main);
const h1 = createComponent('h1', 'battleship', header);
h1.innerHTML = 'Battleship';
const ggab13 = createComponent('h2', 'ggab13', footer);
ggab13.innerHTML = 'Created by <span id="valsz">|</span> <a href="https://github.com/ggab13">ggab13</a> <img  alt="">';
footer.appendChild(ggab13);
const start = createComponent('button', 'start', container);
start.innerHTML = 'Start Game';
const AI = createPlayer('Odin - AI');
const Gabor = createPlayer('Gabor');
let shipAlignment;

const restart = createComponent('button', 'restart', container);
restart.innerHTML = 'Restart Game';

// const coordinates = document.querySelectorAll('.coordinate');

startGame();

const shipCreateForm = document.querySelector('.shipCreate-form');
const placeShipDom = document.querySelector('.shipCreate-form__button');
const x = document.querySelector('.shipCreate-form__x');
const y = document.querySelector('.shipCreate-form__y');
const length = document.querySelector('.shipCreate-form__length');
let inputY;
let inputX;
let inputLength;

x.addEventListener('change', doX);
y.addEventListener('change', doY);
length.addEventListener('change', doLength);

start.addEventListener('click', () => {
  startBattle();
});
restart.addEventListener('click', () => {
  location.reload();
  return false;
});
placeShipDom.addEventListener('click', (e) => {
  e.preventDefault();
  shipAlignment = document.querySelector('input[name="align"]:checked').value;
  if (inputLength < 6) {
    Gabor.playerPlaceShips(parseInt(inputLength), parseInt(inputX), parseInt(inputY), shipAlignment);
    x.value = '';
    y.value = '';
    length.value = '';
    player.innerHTML = '';
    createBoard(Gabor, player);
  } else {
    console.log('Too long');
  }
});

function placeShipForm() {
  const form = createComponent('form', 'shipCreate-form', main);
  const formDom = document.querySelector('.shipCreate-form');

  const xLabel = createComponent('label', 'shipCreate-form__xLabel', formDom);
  xLabel.innerHTML = 'X - Coordinate';
  const xInput = createComponent('input', 'shipCreate-form__x', formDom);

  const YLabel = createComponent('label', 'shipCreate-form__yLabel', formDom);
  YLabel.innerHTML = 'Y - Coordinate';
  const YInput = createComponent('input', 'shipCreate-form__y', formDom);

  const lengthLabel = createComponent('label', 'shipCreate-form__yLabel', formDom);
  lengthLabel.innerHTML = 'Length';
  const length = createComponent('input', 'shipCreate-form__length', formDom);

  const formAlign = createComponent('form', 'shipCreate-form__align', formDom);
  const formAlignDom = document.querySelector('.shipCreate-form__align');

  const horizontal = createComponent('input', 'shipCreate-form__align--horizontal', formAlignDom);
  const horizontalLabel = createComponent('label', 'shipCreate-form__horizontalLabel', formAlignDom);
  horizontalLabel.innerHTML = 'Horizontal';
  horizontal.setAttribute('type', 'radio');
  horizontal.checked = 'checked';
  horizontal.setAttribute('name', 'align');
  horizontal.value = 'horizontal';

  const vertical = createComponent('input', 'shipCreate-form__align--vertical', formAlignDom);
  const verticalLabel = createComponent('label', 'shipCreate-form__verticalLabel', formAlignDom);
  verticalLabel.innerHTML = 'Vertical';
  vertical.setAttribute('type', 'radio');
  vertical.setAttribute('name', 'align');
  vertical.value = 'vertical';

  const placeButton = createComponent('button', 'shipCreate-form__button', formDom);
  placeButton.innerHTML = 'Place Ship';
}

function startGame() {
  AI.playerPlaceShips(2, 0, 1, 'horizontal');
  AI.playerPlaceShips(2, 2, 2, 'vertical');
  AI.playerPlaceShips(3, 4, 4, 'horizontal');
  AI.playerPlaceShips(4, 2, 9, 'vertical');
  AI.playerPlaceShips(5, 9, 5, 'horizontal');
  createBoard(Gabor, player);
  createBoard(AI, ai);
  main.style.display = 'flex';
  placeShipForm();
}

function DOMallShipSunk() {
  if (Gabor.gameboard.allShipsSunk() === true) {
    h1.innerHTML = 'AI WON';
    restart.style.display = 'inline';
    ai.style.pointerEvents = 'none';
  }
  if (AI.gameboard.allShipsSunk() === true) {
    h1.innerHTML = 'Gabor WON';
    restart.style.display = 'inline';
    ai.style.pointerEvents = 'none';
  }
}
function startBattle() {
  start.style.display = 'none';
  ai.style.display = 'flex';
  shipCreateForm.style.display = 'none';

  document.body.addEventListener('click', (e) => {
  // if (e.target.parentElement.classList.contains('ai')) {
    const element = e.target;
    const elementX = parseInt(element.getAttribute('data-x'));
    const elementY = parseInt(element.getAttribute('data-y'));
    element.parentElement.disabled = true;

    if (e.target.classList.contains('ship')) {
      element.classList.add('hit');
      AI.gameboard.receiveAttack(elementX, elementY);
      AI.aiAttack(Gabor.gameboard);
    }

    if (e.target.classList.contains('undefined')) {
      element.classList.add('miss');
      AI.aiAttack(Gabor.gameboard);
    }
    setTimeout(() => {
      player.innerHTML = '';
      createBoard(Gabor, player);
    }, 1000);

    DOMallShipSunk();
  // }
  });
}

function doX() {
  inputX = this.value;
}
function doY() {
  inputY = this.value;
}
function doLength() {
  inputLength = this.value;
}
