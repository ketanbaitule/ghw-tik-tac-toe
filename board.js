class Board{
	#player1;
	#player2;
	#player1Chance;
	#board;
	#chanceLeft;
	#gameIsRunning;
	constructor(player1 = "Player 1", player2 = "Player 2"){
		this.#player1 = player1;
		this.#player2 = player2;
		this.#player1Chance = true;
		this.#board = [
				['','',''],
				['','',''],
				['','','']
			]
		this.#chanceLeft = 9;
		this.#gameIsRunning = true;
	}

	get board(){
		return this.#board;
	}

	get check_game_over(){
		// Diagonal Check LTR
		if(this.#board[0][0] != '' && this.#board[0][0] == this.#board[1][1] && this.#board[1][1] == this.#board[2][2]) {
			return { status:200, winner:this.whosChance, msg:this.whosChance+" won the game."}
		}
		// Diagonal Check RTL
		if(this.#board[0][2] != '' && this.#board[0][2] == this.#board[1][1] && this.#board[1][1] == this.#board[2][0]) {
			return { status:200, winner:this.whosChance, msg:this.whosChance+" won the game."}
		}

		for(let i = 0; i < this.#board[0].length; i++){
			for(let j = 0; j < this.#board[0].length; j++){
				// Horizontal Check
				if(this.#board[i][0] != '' && this.#board[i][0] == this.#board[i][1] && this.#board[i][1] == this.#board[i][2]) {
					return { status:200, winner:this.whosChance, msg:this.whosChance+" won the game."}
				}
				// Vertical Check
				if(this.#board[0][i] != '' && this.#board[0][i] == this.#board[1][i] && this.#board[1][i] == this.#board[2][i]) {
					return { status:200, winner:this.whosChance, msg:this.whosChance+" won the game."}
				}
			}
		}

		// Check Chance Left
		if (this.#chanceLeft == 0) {
			return { status:204, winner:"Tie", msg:"No Valid Moves Remaining"}
		}

		return {status: false, msg:"Valid Chance Left"}
	}

	get whosChance(){
		return this.#player1Chance ? this.#player1 : this.#player2;
	}

	play(row,col){
		if(!this.#gameIsRunning) return this.check_game_over;
		// Check Already Played
		if(this.#board[row][col] != ""){
			return {status: false, msg:"Position is already occupied. Pls Select Different Position."};
		}
		this.#board[row][col] = this.#player1Chance ? "X" : "0";
		this.#chanceLeft--;
		// Check Game Over
		let status = this.check_game_over;
		if(status.status){
			this.#gameIsRunning = !this.#gameIsRunning;
			status.position = this.#board[row][col];
			return status
		};
		this.#player1Chance = !this.#player1Chance;
		return {status:true, position:this.#board[row][col], msg:"Position Played"};
	}
}