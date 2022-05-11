import {useState} from "react";
import {board} from "./common/consts/board";
import black from './images/black100.gif'; 
import white from './images/white100.gif'; 
import red from './images/red100.gif'; 
import T from './images/tower100.gif'; 
import H from './images/horse.gif'; 
import L from './images/laufer.gif'; 
import K from './images/king.gif'; 
import Q from './images/queen.gif'; 
import styles from './App.module.scss';

function App(){
  let gameBoardUpdate = () => {
    return (board.map(indexTable => 
      <div>{indexTable.map(element => {
                if(element === 'B'){ return <img src={black} alt="" />
        } else if (element === 'W'){ return <img src={white} alt="" /> 
        } else if (element === 'T'){ return <img src={T} alt="" />  
        } else if (element === 'H'){ return <img src={H} alt="" />                    
        } else if (element === 'L'){ return <img src={L} alt="" />  
        } else if (element === 'K'){ return <img src={K} alt="" /> 
        } else if (element === 'Q'){ return <img src={Q} alt="" />
        } else if (element === 'X'){ return <img src={red} alt="" /> 
          };
        })
      }</div>)
    );
  };

  let [gameBoardDisplay, setGameBoardDisplay] = useState(gameBoardUpdate());
  let gamePawns = ['K', 'Q', 'T', 'H', 'L'];					
  let moves;		
  let chess;						

  class ChessOnBoardGenerator {
    constructor(board){
      this.board = board;
    };
    generateChess(){
      let randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      let randomPawn = gamePawns[randomNumber(0, gamePawns.length - 1)];
      let y = randomNumber(0, 7);
      let x = randomNumber(0, 7);
      let checkBoardForNewPawn = (value, gamePawns) => {
        let status = false;
        for (let i = 0; i < gamePawns.length; i++) {
          let pawn = gamePawns[i];
            if (pawn == value) {
              status = true;
              break};
          } return status;
      };
      let chessOnBoard = (x, y, gamePawns) => {
        let pawnExist = checkBoardForNewPawn(board[x][y], gamePawns);
          if(pawnExist !== true){
            }else{
              y = randomNumber(0, 7);
              x = randomNumber(0, 7);
              chessOnBoard();
          };
      };
      board[x][y] = randomPawn;
      console.log(randomPawn);
      return {figureType: randomPawn, x: x, y: y}
    };
  };
    
  // factory
  const movesGenerator = (function() {
    class King{
      constructor(options) {
        this.moves = this.move();
      }
      move(){
        let moves =[];
        for (let x = -1; x < 2; x += 1) {
          for (let y = -1; y < 2; y += 1) {
            if (!(x === 0 && y === 0)) {
              moves.push([x, y]);
            };
          };
        };
        return moves;
      };
    };
    class Horse{
      constructor(options) {
        this.moves = this.move();
      }
      move(){
        let moves =[];
        for (let x = -2; x < 3; x +=1) {
          for (let y = -2; y < 3; y += 1) {
            if (x!==y && -x!==y && y!==0 && x!==0){
              moves.push([x, y]);
            };
          };
        };        
        return moves;
      };
    };
    class Queen {
      constructor(options) {
        this.moves = this.move();
      }
      move(){
        let moves =[];
        for (let x = -7; x < 8; x += 1) {
          for (let y = -7; y < 8; y += 1) {
              // slants
              if (!(x === 0 && y === 0 ) && (x === y) || !(x === 0 && y === 0 ) && (-x===y)
              // vertical and horizontal
              || x !== 0 && y === 0 || y !== 0 && x === 0 ) {
                moves.push([x, y]);
              };
            };
        };
        return moves;
      };
    };
    class Laufer {
      constructor(options) {
        this.moves = this.move();
      }
      move(){
        let moves =[];
        for (let x = -7; x < 8; x += 1) {
          for (let y = -7; y < 8; y += 1) {
            if (!(x === 0 && y === 0 ) && (x === y) || !(x === 0 && y === 0 ) && (-x===y) ) {
              moves.push([x, y]);
            };
          };
        };
          return moves;
      };
    };
    class Tower {
      constructor(options) {
        this.moves = this.move();
      }
      move(){
        let moves =[];
        for (let x = -7; x < 8; x += 1) {
          for (let y = -7; y < 8; y += 1) {
            if (x !== 0 && y === 0 || y !== 0 && x === 0 ) {
              moves.push([x, y]);
            };
          };
        };
        return moves;
      };
    };
    return {
      createMoves: options => {
        if (options.figureType === "Q") {return new Queen(options)};
        if (options.figureType === "K") {return new King(options)};
        if (options.figureType === "L") {return new Laufer(options)};
        if (options.figureType === "H") {return new Horse(options)};
        if (options.figureType === "T") {return new Tower(options)};
        }
      };
  })();

  const king = movesGenerator.createMoves({figureType: "K"});
  const queen = movesGenerator.createMoves({figureType: "Q"});
  const laufer = movesGenerator.createMoves({figureType: "L"});
  const horse = movesGenerator.createMoves({figureType: "H"});
  const tower = movesGenerator.createMoves({figureType: "T"});
  
  class Game {
    constructor(board, pawnArray, chess, moves){
        this.board = board;
        this.pawnArray = pawnArray;
        this.chess = chess;
        this.moves= moves;
    };
    gameStart(){
      chess = new ChessOnBoardGenerator(board).generateChess();
      console.log(chess); 
      // checking whole board for figures and their moves, if figure can be beaten than sending the result
      let checkBoardForExistingPawn = (x, y, board, pawnArray) => {
        let status = false;
        for (let i = 0; i < pawnArray.length; i += 1) {
          // if move beside of the board than false 
          if ( x < 0 || y < 0 || x>7 || y>7 ){ return false };
          let pawn = pawnArray[i];
          if (pawn === board[x][y]) {
              status = true;
              break;
          }
        }
        return status;
      }
      let markMovesOnBoard = (x, y, board) => {
        for (let i = 0; i < moves.length; i += 1) {
          let j = Number(x) + moves[i][0];
          let k = Number(y) + moves[i][1];
          // if move beside the board return nothing 
          if( j < 0 || k < 0 || j>7 || k>7 ){ }else{ 
            // checking for figure to be beaten
            let mate = checkBoardForExistingPawn( j, k, board, gamePawns );
            if(mate !== true){board[j][k] = 'X';
            }else{alert("Checkmate!");
            alert(`The ${board[x][y]} on ${x}, ${y} beating ${board[x + moves[i][0]][y + moves[i][1]]} on ${x + moves[i][0]}, ${y + moves[i][1]}`);
            document.getElementById("myBtn").disabled = true;
            };
          };
        };
      };
      for(let x = 0; x < 8; x += 1) {
        for(let y = 0; y < 8; y += 1) {
          // check for figure exist
          if (checkBoardForExistingPawn(x, y, board, gamePawns) === true){
            // taking range of moves
            if (board[x][y] === 'Q') { moves = queen.move(); markMovesOnBoard(x, y, board)};
            if (board[x][y] === 'T') { moves = tower.move(); markMovesOnBoard(x, y, board)};
            if (board[x][y] === 'L') { moves = laufer.move(); markMovesOnBoard(x, y, board)};
            if (board[x][y] === 'K') { moves = king.move(); markMovesOnBoard(x, y, board)};
            if (board[x][y] === 'H') { moves = horse.move(); markMovesOnBoard(x, y, board)};
            // check for figure in moves range
            for (let i = 0; i < moves.length; i += 1) {
              let mate = checkBoardForExistingPawn( x + moves[i][0], y + moves[i][1], board, gamePawns );
              if (mate === true) { 
                return (console.log(`The ${board[x][y]} on ${x}, ${y} beating ${board[x + moves[i][0]][y + moves[i][1]]} on ${x + moves[i][0]}, ${y + moves[i][1]}`))
              };
            };
          };
        };
      };
    };
  }; 

let game = new Game();

let gameStart = () => { 
  game.gameStart();
  setGameBoardDisplay(gameBoardUpdate());
};
      
  return (
      <>
        <div className={styles.board}>
          <button id="myBtn" onClick={gameStart}> Add figure </button>
          <div><br></br></div>
          {gameBoardDisplay}
        </div>
      </>
    )
  }
      
  export default App;      