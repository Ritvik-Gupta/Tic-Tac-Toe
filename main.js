const domButtons = document.querySelectorAll('.item');
const heading = document.querySelector('#heading');
const message = document.querySelector('#message');
const reset = document.querySelector('#reset');
const turn = document.querySelector('#turn');

const symbols = ['X', 'O'];
let grid, currentPlayer, playerWon;
resetBoard();

reset.addEventListener('click', () => {
	resetBoard();
	console.log('Reset Board');
});

domButtons.forEach((button, index) => {
	button.setAttribute('i', (index - (index % 3)) / 3);
	button.setAttribute('j', index % 3);

	button.addEventListener('click', ({ target }) => {
		const i = target.getAttribute('i');
		const j = target.getAttribute('j');

		if (grid[i][j] !== 0 || playerWon !== null) return null;

		target.textContent = symbols[currentPlayer - 1];
		target.classList.remove('empty');
		target.classList.add(`player${currentPlayer}`);

		grid[i][j] = currentPlayer;
		currentPlayer = currentPlayer === 1 ? 2 : 1;

		message.textContent = `Player ${currentPlayer}'s turn`;
		const obj = checkBoard(grid);
		playerWon = obj.winner;

		if (playerWon !== null) {
			heading.textContent =
				playerWon > 0 ? `Winner : Player ${playerWon}` : 'It is a Tie';
			message.textContent = 'Click on Play Again to Reset';
			reset.textContent = 'Play Again';
		}

		console.groupCollapsed('Board Config ...');
		console.log('Current Player :\t', currentPlayer);
		console.log('Player Won :\t', playerWon);
		console.table(grid);
		console.groupEnd();
	});
});

function transpose(array) {
	const trans = [];
	for (let i = 0; i < array.length; ++i) trans[i] = [];

	for (let i = 0; i < array.length; ++i) {
		for (let j = 0; j < array.length; ++j) {
			trans[j][i] = array[i][j];
		}
	}
	return trans;
}

function diagonals(array) {
	const diag1 = [],
		diag2 = [];
	for (let i = 0; i < array.length; ++i) {
		diag1[i] = array[i][i];
		diag2[i] = array[i][array.length - 1 - i];
	}
	return { diag1, diag2 };
}

function checkBoard(grid) {
	const trans = transpose(grid);
	const { diag1, diag2 } = diagonals(grid);

	for (let i = 0; i < grid.length; ++i) {
		if (grid[i][0] !== 0 && grid[i].every(el => el === grid[i][0]))
			return { winner: grid[i][0] };
	}

	for (let i = 0; i < trans.length; ++i) {
		if (trans[i][0] !== 0 && trans[i].every(el => el === trans[i][0]))
			return { winner: trans[i][0] };
	}

	if (diag1[0] !== 0 && diag1.every(el => el === diag1[0]))
		return { winner: diag1[0] };

	if (diag2[0] !== 0 && diag2.every(el => el === diag2[0]))
		return { winner: diag2[0] };

	if (grid.every(row => row.every(el => el !== 0))) return { winner: 0 };

	return null;
}

function resetBoard() {
	currentPlayer = 1;
	playerWon = null;
	grid = [];
	for (let i = 0; i < 3; ++i) {
		grid[i] = [];
		for (let j = 0; j < 3; ++j) grid[i][j] = 0;
	}

	domButtons.forEach(button => {
		button.classList.remove('player1', 'player2');
		button.classList.add('empty');
		button.textContent = '';
	});
	message.textContent = `Player 1's turn`;
	heading.textContent = 'Tic Tac Toe';
	reset.textContent = 'Reset Game';
}
