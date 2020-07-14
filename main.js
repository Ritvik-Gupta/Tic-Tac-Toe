const buttons = document.querySelectorAll('.item');
const heading = document.querySelector('#heading');
const message = document.querySelector('#message');
const reset = document.querySelector('#reset');
const turn = document.querySelector('#turn');

const board = new Board(['X', 'O']);
resetBoardDOM();

reset.addEventListener('click', () => {
	board.resetBoard();
	resetBoardDOM();
	console.log('Reset Board');
});

buttons.forEach((button, index) => {
	button.setAttribute('i', (index - (index % 3)) / 3);
	button.setAttribute('j', index % 3);

	button.addEventListener('click', ({ target }) => {
		const i = target.getAttribute('i');
		const j = target.getAttribute('j');

		if (board.grid[i][j] !== 0 || board.playerWon !== null) return null;

		target.textContent = board.symbol;
		target.classList.remove('empty');
		target.classList.add(`player${board.currentPlayer}`);

		board.setBoard(i, j);
		message.textContent = `Player ${board.currentPlayer}'s turn`;

		board.checkBoard();
		if (board.playerWon !== null) {
			heading.textContent =
				board.playerWon > 0 ? `Winner : Player ${board.playerWon}` : 'It is a Tie';
			message.textContent = 'Click on Play Again to Reset';
			reset.textContent = 'Play Again';
		}

		board.print();
	});
});

function resetBoardDOM() {
	buttons.forEach(button => {
		button.classList.remove('player1', 'player2');
		button.classList.add('empty');
		button.textContent = '';
	});
	message.textContent = `Player 1's turn`;
	heading.textContent = 'Tic Tac Toe';
	reset.textContent = 'Reset Game';
}
