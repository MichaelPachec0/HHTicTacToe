/* 100devs tic-tac-toe js */
/*https://github.com/Dev-Corinne/TicTacToe*/

// we will declare a reset variable that when the reset button is clicked a fresh start happens.
const restartButton = document.querySelectorAll('#reset')

// we will declare a variable for when a box is selected.
const box = document.querySelectorAll('.box')

// this function will determine the winner and alert it.
const winner = () => {

}

// this function will decide if the game was a tie and will alert if the game is a tie,
const tie = () => {

}

// this function will be used to reset the board when the restart button is clicked.
const restart = () => {

}


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
const rowSize = 3;

class AI {
    constructor() {
        // AI will start from 0 hardest to 3 easiest, TODO: Allow this to be set by the parent class
        this.type = 0;
        //map with AI move to list of lists of winning strategies
        this.aiTree = new Map(), this.moves = new Map();
        this.possible = [...Array(rowSize ** 2).keys()]
        this.playerMoves = [], this.aiMoves = [];
        // hardcode for now, TODO: See they can be calculated
        this.corners = [0, 2, 6, 8]
        // this.lastPlayerMove = Number.MAX_SAFE_INTEGER;
        // this.lastAiMove = Number.MAX_SAFE_INTEGER;
    }

    // ((i < (arr.length/rows)) ? 1 : 0) * 2 + i *
    choice(playerMove) {
        // Simple rules AI is 0
        // check if there are any immediate wining moves
        // check if there are any player moves
        // choose a random spot (TODO: more intelligent guessing)
        // edges follow
        // 0	+3,+4,+1
        // 2	+3,+2,-1
        // 6	-3,-2,+1
        // 8	-3,-4,-1
        this.playerMoves.push(playerMove)
        if (this.moves.size === 0) {
            // this.possible = this.possible.filter(move => !([...illegal_moves.values()].find(e => move === e )))
            // last move by player
            // let last = illegal_moves[illegal_moves.length-1]
            this.moves.set(playerMove, 1)
            this.possible.splice(this.possible.findIndex(playerMove), 1)
            //started mid
            if (playerMove === 5) {

            }
        } else {
            let ret = 0;
            if (playerMove === 5) {
                // if x started in the middle, pick a corner
                do {
                    let choice = Math.floor(Math.random() * 3);
                    ret = this.corners[choice];
                } while (playerMove === ret)
                this.aiTree.set(this.aiTree.size, [])
            } else {
                // always pick middle
                ret = 5
            }
            // let the AI keep track of their moves
            this.moves.set(ret, 0);
            this.aiMoves.push(ret);
            return ret;

        }
    }

    calc(choice) {
        // need to calculate possible move-sets
        // need to validate that moves are valid moves (ie that the player has not claimed those squares)
        // possible moves will contain a list of lists
        let possibleMoves = new Map(), possibleBlocks = new Map();
        for (const move of this.aiMoves) {
            if (move === 4) {
                // check 0,1,2,3
                for (let i = 0; i < rowSize + 1; i++) {
                    //means that player has taken the square
                    if (!(this.moves.get(i) === 1)) {
                        // means that the square is a corner
                        if (this.corners.includes(i)) {
                            // since the AI took the middle square only vertical and horizontal moves are possible
                            let hCount = 0, vCount = 0;
                            for (let x = 1; x < rowSize; i++) {
                                // check both simultaneously
                                let vertical = x * rowSize, horizontal = x + rowSize;
                                if (this.moves.get(vertical) === 1) {
                                    vCount += 1;
                                } else {

                                }
                                if (this.moves.get(horizontal) === 1) {
                                    hCount += 1;
                                }
                            }
                        }

                    } else {
                        //	means that AI has gotten the square or no one has
                        let adjacent = (move - i) + move
                        // square is ours
                        if (this.moves.get(i) === 0) {
                            if (this.moves.get(adjacent) === undefined) {
                                // only one square needed to win
                                if (possibleMoves.get(1) === undefined)
                                    possibleMoves.push([adjacent])
                            } else {
                                // player has taken the adjacent square
                                // for now ignore SUGGESTION: Defensive CPU?
                                if (this.corners.includes(i)) {
                                    if (i === 0) {
                                        // check only once horizontal =  (y)+(x*3) vertical = (y * 3) + x
                                    }
                                    // TODO: refactor hardcoded values
                                    let count = 0;
                                    let block = [];
                                    for (let x = 0; x < rowSize; x++) {
                                        if (this.playerMoves.get(x * rowSize + i) === 1) {
                                            count++;
                                        } else {
                                            block.push(x * rowSize + i)
                                        }
                                    }

                                } else {

                                }
                                let key = rowSize - count
                                if (possibleBlocks.get(key) == undefined) {
                                    possibleBlocks.set(key, [block])
                                }
                                possibleBlocks.set(key, possibleBlocks.get(key).push(block))
                            }
                        } else {
                        }
                        // AI has the square or the square is not taken this.moves.get(adjacent) === undefined

                        if (this.moves.get(adjacent) === 0) {

                        }
                    }
                    // if (!this.playerMoves.find(i)){
                    // 	if (!this.playerMoves.find(move - i)){
                    //
                    // 	}
                }
            }
        }

    }
}

class Square {
    constructor(id) {
        this.id = id;
        this.status = -1;

    }

    getId() {
        return this.id;
    }

    setOwner(owner) {
        // set status to whichever player owns the square
        this.status = owner;
    }

    displayOwner(owner) {
        // for now assume ai is
    }

    getOwner() {
        return this.status;
    }

    isOwned() {
        return this.status != -1;
    }

    reset() {
        this.status = 0;
    }
}

class GameBoard {
    constructor() {
        this.board = this.createBoard();
        this.moves = new Map();
        this.ai = new AI();
    }

    createBoard() {
        let ret = [];
        for (let i = 0; i < rowSize ** 2; i++) {
            ret.push(new Square(i));
        }
        return ret;
    }

    getBoard() {
        return this.board;
    }

    onClick(player, loc) {
        if (!this.board[loc].isOwned()) {
            this.board[loc].setOwner(player);
            console.log(`Player ${player} now owns square ${loc}`)
            // this.moves.push(loc);
            this.moves.set(loc, player)
            this.checkWinner(loc, 1)
            //AI's turn
            let ai_loc = this.ai.choice(loc)
            if (!this.board[ai_loc].isOwned()){
                this.board[ai_loc].setOwner(0)
                this.moves.set(ai_loc, 0)
                this.checkWinner()
            }

        } else {
            console.log(`Square ${loc} is already owned by ${((this.board[loc].getOwner === 1) ? "Player" : "AI")}`)
        }
    }

    reset() {
        for (const sq of this.board) {
            sq.reset();
        }
        //TODO: RESET the graphics portion of the board
    }

    checkWinner(move, player) {
        // Only check for winning moves after 5 moves, there no possible win before that
        if (this.moves.size > 4) {
            if (this.moves.size === rowSize ** 2) {
                console.log(`${player} has tied`)
            }
            for (let i = 0; i < 7; i++) {
                if (this.moves.get(i) === player) {
                    if (!i % 3) {
                        if (player === this.moves.get(i + 1) && this.moves.get(i + 2) === player) {
                            // horizontal win
                            console.log(`${player} has won!`)
                        }
                    } else if (i < rowSize) {
                        if (player === this.moves.get(i + 3) &&  this.moves.get(i + 6) === player) {
                            //vertical win
                            console.log(`${player} has won!`)
                        }
                        if (!i % 2) {
                            // only check 0 and 2 since 6 and 8 are the same cross win
                            if (player === this.moves.get(((i === 0) ? 4 : 2) * 1) &&  this.moves.get(((i === 0) ? 4 : 2) * 2) === player) {
                                //cross win
                                console.log(`${player} has won!`)
                            }
                        }
                    }
                }
            }
        }
    }
}


const board = new GameBoard()
for (let square of box) {
    square.addEventListener("click", (i) => {
        board.onClick(1, Number(i.target.id))

    })
}
restartButton.addEventListener("click", board.reset())

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
