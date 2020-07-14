class Board {
	constructor(symbols) {
		this.symbols = symbols;
		this.currentPlayer = 1;
		this.playerWon = null;
		this.grid = [];
	}

	get symbol() {
		return this.symbols[this.currentPlayer - 1];
	}

	checkBoard() {
		const grid = this.grid;
		const trans = Board.transpose(grid);
		const { diag1, diag2 } = Board.diagonals(grid);

		for (let i = 0; i < grid.length; ++i) {
			if (grid[i][0] !== 0 && grid[i].every(el => el === grid[i][0])) {
				this.playerWon = grid[i][0];
				return { winner: grid[i][0] };
			}
		}

		for (let i = 0; i < trans.length; ++i) {
			if (trans[i][0] !== 0 && trans[i].every(el => el === trans[i][0])) {
				this.playerWon = trans[i][0];
				return { winner: trans[i][0] };
			}
		}

		if (diag1[0] !== 0 && diag1.every(el => el === diag1[0])) {
			this.playerWon = diag1[0];
			return { winner: diag1[0] };
		}

		if (diag2[0] !== 0 && diag2.every(el => el === diag2[0])) {
			this.playerWon = diag2[0];
			return { winner: diag2[0] };
		}

		if (grid.every(row => row.every(el => el !== 0))) {
			this.playerWon = 0;
			return { winner: 0 };
		}

		this.playerWon = null;
		return null;
	}

	print() {
		console.groupCollapsed('Board Config ...');
		console.log('Current Player :\t', this.currentPlayer);
		console.log('Player Won :\t', this.playerWon);
		console.table(this.grid);
		console.groupEnd();
	}

	setBoard(i, j) {
		this.grid[i][j] = this.currentPlayer;
		this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
	}

	resetBoard() {
		this.currentPlayer = 1;
		this.playerWon = null;
		this.grid = [];
		for (let i = 0; i < 3; ++i) {
			this.grid[i] = [];
			for (let j = 0; j < 3; ++j) this.grid[i][j] = 0;
		}

		console.warn('Reset Board');
	}

	static transpose(array) {
		const trans = [];
		for (let i = 0; i < array.length; ++i) trans[i] = [];

		for (let i = 0; i < array.length; ++i) {
			for (let j = 0; j < array.length; ++j) {
				trans[j][i] = array[i][j];
			}
		}
		return trans;
	}

	static diagonals(array) {
		const diag1 = [],
			diag2 = [];
		for (let i = 0; i < array.length; ++i) {
			diag1[i] = array[i][i];
			diag2[i] = array[i][array.length - 1 - i];
		}
		return { diag1, diag2 };
	}
}
