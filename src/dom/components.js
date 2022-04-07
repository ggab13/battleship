function createComponent(type, className, parentElement) {
  const element = document.createElement(type);

  element.classList.add(className);

  return parentElement.appendChild(element);
}
function createBoard(playerName, playersBoard) {
  const board = playerName.gameboard.getCoordinates();
  for (let y = 0; y < 10; y++) {
    const row = document.createElement('div');
    playersBoard.appendChild(row);
    row.className = 'row';
    for (let x = 0; x < 10; x++) {
      const column = document.createElement('div');
      const coordinate = document.createElement('div');
      coordinate.classList.add('coordinate');
      // column.innerHTML = board[x][y] + x + y;
      column.className = board[x][y];
      column.setAttribute('data-y', y);
      column.setAttribute('data-x', x);
      coordinate.appendChild(column);
      row.appendChild(coordinate);
    }
  }
}

export { createComponent, createBoard };
