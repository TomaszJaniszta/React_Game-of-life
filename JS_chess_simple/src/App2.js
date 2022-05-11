import { useState } from "react";
import { board } from "./common/consts/board";
import black from './images/black100.gif'; 
import white from './images/white100.gif'; 
import red from './images/red100.gif'; 
import tower from './images/tower.gif'; 
import horse from './images/horse.gif'; 
import laufer from './images/laufer.gif'; 
import king from './images/king.gif'; 
import queen from './images/queen.gif'; 
import styles from './App.module.scss';

function App() {
  let gameBoardUpdate = () => {
    return (  board.map( indexTable => 
      <div>{indexTable.map(element => {
                if(element === 'B'){ return <img src={black} alt="" />
        } else if (element === 'W'){ return <img src={white} alt="" /> 
        } else if (element === 'T'){ return <img src={tower} alt="" />  
        } else if (element === 'H'){ return <img src={horse} alt="" />                    
        } else if (element === 'L'){ return <img src={laufer} alt="" />  
        } else if (element === 'K'){ return <img src={king} alt="" /> 
        } else if (element === 'Q'){ return <img src={queen} alt="" />
        } else if (element === 'X'){ return <img src={red} alt="" /> 
          };
        })
      }</div> )
      );
  };

  let [gameBoardDisplay, setGameBoardDisplay] = useState(gameBoardUpdate());								
  let gamePawns = ['K', 'Q', 'T', 'H', 'L'];						
  let moves = [];								

  let randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };      

  let checkBoardForNewPawn = (value, array) => {
    let status = false;
    for (let i = 0; i < array.length; i++) {
      let pawn = array[i];
      if (pawn == value) {
        status = true;
        break};
    } return status;
  };
  
  let addRandomPawn = (gamePawns) => {
    let boardY = randomNumber(0, 7);
    let boardX = randomNumber(0, 7);
    let randomPawn = gamePawns[randomNumber(0, gamePawns.length - 1)];
    // console.log(randomPawn);
    // checking availability of new random field
    let pawnExist = checkBoardForNewPawn(board[boardX][boardY], gamePawns);
    if(pawnExist !== true){
      board[boardX][boardY] = randomPawn;
    }else{console.log('Pawn exist on the random field. Try again'); 
          alert('Pawn exist on the random field. Try again');       
    };
  };
    
  // creating array king moves
  let kingMoves = () => {
  moves = [];
    for (let x = -1; x < 2; x += 1) {
      for (let y = -1; y < 2; y += 1) {
        if (!(x === 0 && y === 0)) {
          moves.push([x, y]);
        };
      };
    };
  };
  // creating array horse moves
  let horseMoves = () => {
  moves = [];
    for (let x = -3; x < 4; x += 2) {
      for (let y = -3; y < 4; y += 2) {
        if (x!==y && -x!==y){
          moves.push([x, y]);
        }
      }
    }
    console.log(moves);
  };
  // creating array queen moves
  let queenMoves = () => {
    moves = [];
    for (let x = -7; x < 8; x += 1) {
      for (let y = -7; y < 8; y += 1) {
      // slants
        if (!(x === 0 && y === 0 ) && (x === y) || !(x === 0 && y === 0 ) && (-x===y)
        // vertical and horizontal
        || x !== 0 && y === 0 || y !== 0 && x === 0 ) {
          moves.push([x, y]);
        }
      }
    }
  };
  // creating array laufer moves
  let lauferMoves = () => {
    moves = [];
    for (let x = -7; x < 8; x += 1) {
      for (let y = -7; y < 8; y += 1) {
        if (!(x === 0 && y === 0 ) && (x === y) || !(x === 0 && y === 0 ) && (-x===y) ) {
          moves.push([x, y]);
        }
      }
    }
  };
  // creating array Tower moves
  let towerMoves = () => {
    moves = [];
    for (let x = -7; x < 8; x += 1) {
      for (let y = -7; y < 8; y += 1) {
        if (x !== 0 && y === 0 || y !== 0 && x === 0 ) {
          moves.push([x, y]);
        }
      }
    }
  };
        
  let checkBoardForExistingPawn = (x, y, board, pawnArray) => {
    let status = false;
      for (let i = 0; i < pawnArray.length; i += 1) {
        // if move beside of the board than false 
        if ( x < 0 || y < 0 || x>7 || y>7 ){ return false }
        let pawn = pawnArray[i];
        if (pawn === board[x][y]) {
          status = true;
          break;
        }
      }
    return status;
  }

  // checking whole board for figures and their moves, if figure can be beaten than sending the result
  let checkForResult = () => {
    for(let x = 0; x < 8; x += 1) {
      for(let y = 0; y < 8; y += 1) {
        // check for figure exist 
        if (checkBoardForExistingPawn(x, y, board, gamePawns) === true) {
          // create range of moves
          if (board[x][y] === 'Q') { queenMoves(); markMovesOnBoard(x, y, board)};
          if (board[x][y] === 'T') { towerMoves(); markMovesOnBoard(x, y, board)};
          if (board[x][y] === 'L') { lauferMoves(); markMovesOnBoard(x, y, board)};
          if (board[x][y] === 'K') { kingMoves(); markMovesOnBoard(x, y, board)};
          if (board[x][y] === 'H') { horseMoves(); markMovesOnBoard(x, y, board)};
          for (let i = 0; i < moves.length; i += 1) {
          // check for figure in moves range of found figure
            let mate = checkBoardForExistingPawn( x + moves[i][0], y + moves[i][1], board, gamePawns );
            if (mate === true) { 
              return (console.log(`The ${board[x][y]} on ${x}, ${y} beating ${board[x + moves[i][0]][y + moves[i][1]]} on ${x + moves[i][0]}, ${y + moves[i][1]}`))
            };
          };
        };
      };
    };
  }; 

  // function marking possible moves for figures by adding 'X' on board and checking mate
  let markMovesOnBoard = (x, y, board) => {
    for (let i = 0; i < moves.length; i += 1) {
      let j = Number(x) + moves[i][0]
      let k = Number(y) + moves[i][1]
      // if move beside the board return nothing 
      if  ( j < 0 || k < 0 || j>7 || k>7 ){ }else{ 
        let mate = checkBoardForExistingPawn( j, k, board, gamePawns );
        if (mate !== true){board[j][k] = 'X'}else{alert("Checkmate!");
              document.getElementById("myBtn").disabled = true;
        };
      };
    };
  };
      
  let gameStart = ()=>{ 
    addRandomPawn(gamePawns);
    checkForResult();
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