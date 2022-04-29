/* 100devs tic-tac-toe js */
// https://github.com/Dev-Corinne/TicTacToe

// Event listener for each cell.


// Conditional - If three in a row are selected by either the user or AI. The game ends. If all squares are selected and three in a row does not occur. It is a draw.
// Conditional - Three in a row means [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], or [6,7,8] all have the same value.
// Horizontally => 0,1,2; 3,4,5; 6,7,8
// Vertically => 0,3,6; 1,4,7; 2,5,8
// Diagonally => 0,4,8; 2,4,6
// Conditional - If any square is selected by either User or AI. The square cannot be reselected.
// Conditional - The player and the ai can each only make one move per turn.
// Conditional -

//DIRECTIONS
//player's turn: player click adds square number to array 'playerMove'
//bot move: bot adds random number to array 'botMove'

// let ticTacToe = [0,0,0,0,0,0,0,0,0]
// let playerMove = []
// let botMove = []
// let chooseRandom = Math.floor(Math.random()*9)

/*
0 1 2
3 4 5
6 7 8

Win conditions:
012
345
678

036
147
258

048
246
*/
// 0	0,1,2 +1
//		0,3,6 +3
//		0,4,8 +4


// 0	+3,+4,+1
// 2	+3,+2,-1
// 6	-3,-2,+1
// 8	-3,-4,-1
// switch (playerMove) {
// 	case [0,1,2]:
//   case [0,3,6]:
//   case [0,4,8]:
//   case [3,4,5]:
//   case [1,4,7]:
//   case [2,4,6]:
//   case [6,7,8]:
//   case [2,5,8]:
//   	return ('Player wins!')
//     break;
//   default:
//   	return ('Tie!')
// }
class AI {
	constructor(){
		// AI will start from 0 hardest to 3 easiest
		this.type = 0;
		this.moves = []
		this.possible = [...Array(9).keys()]
	}
	choice(illegal_moves){
		// Simple rules
		// check if there are any immediate wining moves
		// check if there are any player moves
		// choose a random spot (TODO: more intelligent quessing)
		// edges follow
		// 0	+3,+4,+1
		// 2	+3,+2,-1
		// 6	-3,-2,+1
		// 8	-3,-4,-1
		if (this.moves){
			this.possible = this.possible.filter(move => !(illegal_moves.find(e => move === e )))



		} else {
			// starting off empty squares start of at a corner per xkcd, there should only be one square occupied
			let ret = 0;
			do {
				let choice = Math.floor(Math.random()*3);
				 ret = [0,2,6,8][choice];
			} while (illegal_moves[0] === ret)
			// let the ai keep track of their moves
			this.moves.push(ret);
			return ret;

		}
	}
}
class Square {
	constructor(id) {
		this.id = id;
    	this.status = 0;

	}
  	getId() {
		return this.id;
	}
  	changeStatus(owner){
		// set status to whichever player owns the square
	 	this.status = owner;
	}
	getOwner(){
		return this.status;
	}
	isOwned(){
		return this.status != 0;
	}
	reset(){
		this.status = 0;
	}
}

class gameBoard {
	constructor(){
		this.board = this.createBoard();
		this.moves = [];
		this.ai = new AI();
	}

	createBoard(){
		let ret = [];
		for(let i =0; i < 9; i++){
			ret.push(new Square(i));
		}
		return ret;
	}
	getBoard() {
		return this.board;
	}
	onClick(player, loc){
		if (!this.board[loc].isOwned()) {
			this.board[loc].changeStatus(player);
			console.log(`Player ${player} now owns square ${loc}`)
			this.moves.push(loc);
			//AI's turn
			let ai_loc = this.ai.choice(this.moves)
			this.board[ai_loc].changeStatus(0)
			this.moves.push(ai_loc)
		} else {
			console.log(`Square ${loc} is already owned by ${((this.board[loc].getOwner === 1) ? "Player":"AI")}`)
		}
	}
	reset(){
		for (const sq of this.board){
			sq.reset();
		}
		//TODO: RESET the graphics portion of the board
	}
	checkWinner(){
		// Only check for winning moves after 4 moves
		if (this.moves.length > 4){

		}
	}
}
board = new gameBoard()
const grid = [...document.querySelectorAll(".box")];
for (let i = 0; i < grid.length; i++){
	grid[i].addEventListener("click", (i) => {
		// console.log(i.target.id);
		board.onClick(1, Number(i.target.id))

	})
}
//contributors:
//We the people of 100Devs, 100baristas, 
//Cormasaurus#4787
//colinnn#1406
//colin's dog, choco bork bork 
//San An Stan#3218
//Mish#5762
//yoda30010#9626 (boonaki)
//itmightbehere#69130
//Michael the cat =^_^=
//TheCrazyHorse#9867 
//WiseOak#4084
//Someone#7786
//OmNomNom#6057
//NicLe#5006
//DeMe#4447;
