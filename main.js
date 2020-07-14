const buttons = document.querySelectorAll('.item');
const heading = document.querySelector('#heading');
const message = document.querySelector('#message');
const reset = document.querySelector('#reset');
const turn = document.querySelector('#turn');

const boardSize = 3;
const board = new Board(['X', 'O']);
resetBoard();

reset.addEventListener('click', resetBoard);

buttons.forEach((button, index) => {
	button.setAttribute('i', (index - (index % boardSize)) / boardSize);
	button.setAttribute('j', index % boardSize);

	button.addEventListener('click', ({ target }) => {
		const i = target.getAttribute('i');
		const j = target.getAttribute('j');

		if (board.grid[i][j] !== 0 || board.playerWon !== null) return null;

		target.textContent = board.symbol;
		target.classList.remove('empty');
		target.classList.add(`player${board.currentPlayer}`);

		board.setBoard(i, j);
		message.textContent = `Player ${board.currentPlayer}'s turn`;
		turn.textContent = board.symbol;

		const cells = board.checkBoard();
		if (board.playerWon !== null) {
			heading.textContent =
				board.playerWon > 0 ? `Winner is Player ${board.playerWon}` : 'It is a Tie';
			message.textContent = 'Click on Play Again';
			turn.textContent = '-';
			reset.textContent = 'Play Again';

			cells.forEach(cell => {
				const index = boardSize * cell[0] + cell[1];
				buttons[index].classList.add('highlight');
			});
		}

		board.print();
	});
});

function resetBoard() {
	board.resetBoard();

	buttons.forEach(button => {
		button.classList.remove('player1', 'player2', 'highlight');
		button.classList.add('empty');
		button.textContent = '';
	});
	message.textContent = `Player ${board.currentPlayer}'s turn`;
	turn.textContent = board.symbol;
	heading.textContent = 'Tic Tac Toe';
	reset.textContent = 'Reset Game';
}
