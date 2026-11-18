// Browser illustration of the actual Assembly Maze map; not an x86 emulator.
const maze = [
  '#####################',
  '#     #       #    S#',
  '# ### # ##### # ### #',
  '#   #   #   #   #   #',
  '### ##### # ##### # #',
  '#   #     #       # #',
  '# ### ########### # #',
  '#     #       #   # #',
  '# ##### ##### # ### #',
  '#       #           #',
  '#####################'
];
let player = {x:1,y:1}, moves = 0, finished = false;
const board = document.querySelector('#maze-board');
const status = document.querySelector('#maze-status');
const directions = {up:[0,-1],left:[-1,0],down:[0,1],right:[1,0]};
function renderMaze(message) {
  board.textContent = maze.map((row,y) => y === player.y
    ? row.slice(0,player.x) + '@' + row.slice(player.x+1) : row).join('\n');
  status.textContent = message || `Reach S · ${moves} move${moves !== 1 ? 's' : ''}`;
  for (const button of document.querySelectorAll('[data-move]')) button.disabled = finished;
}
function move(direction) {
  if (finished) return;
  const [dx,dy] = directions[direction];
  const x = player.x + dx, y = player.y + dy;
  if (!maze[y] || !maze[y][x] || maze[y][x] === '#') {
    renderMaze(`A wall blocks the way · ${moves} move${moves !== 1 ? 's' : ''}`); return;
  }
  player = {x,y}; moves++;
  finished = maze[y][x] === 'S';
  renderMaze(finished ? `You escaped! ${moves} moves.` : undefined);
}
for (const button of document.querySelectorAll('[data-move]')) button.addEventListener('click', () => move(button.dataset.move));
board.addEventListener('keydown', event => {
  const keys = {ArrowUp:'up',ArrowLeft:'left',ArrowDown:'down',ArrowRight:'right',w:'up',a:'left',z:'up',q:'left',s:'down',d:'right'};
  const direction = keys[event.key] || keys[event.key.toLowerCase()];
  if (direction) { event.preventDefault(); move(direction); }
});
document.querySelector('#maze-reset').addEventListener('click', () => {
  player = {x:1,y:1}; moves = 0; finished = false; renderMaze();
});
renderMaze();
