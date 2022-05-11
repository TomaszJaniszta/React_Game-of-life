import { useState } from "react";
import { board } from "./common/consts/board1";
import cell from './images/cell2.gif'; 
import air from './images/air.gif'; 
import styles from './App.module.scss';

function App(){
  let gameBoardUpdate = () => {
    return (board.map(indexTable => 
      <div className={styles.board}>{indexTable.map(element => {
        if(element === 1){ return <img src={cell} alt="" className={styles.Ball}/>
        } else if (element === 0){ return <img src={air} alt="" /> };
        })
      }</div>)
    );
  };

let [gameBoardDisplay, setGameBoardDisplay] = useState(gameBoardUpdate());

    class LifeCounter {
        constructor(board, x, y){
        this.board = board;
        this.x = x;
        this.y = y;
        this.range = this.cellRange();
        this.count = this.count()
        }
          cellRange(){
           let range = [];
            for (let x = -1; x < 2; x += 1) {
             for (let y = -1; y < 2; y += 1) {
              if (!(x === 0 && y === 0)) {
               range.push([x, y]);
               }
             }
            }
           return range;
          };
      count(){
      let lifeConditionCount = 0;
      for (let i = 0; i < this.range.length; i += 1) {
        let result = () => {
        // if beside the board or 0 return false
        if ((this.x + this.range[i][0]) < 0 ||
            (this.y + this.range[i][1]) < 0 ||
            (this.x + this.range[i][0]) > (this.board.length - 1) ||
            (this.y + this.range[i][1]) > (this.board.length -1)) {
              return false;
          } else if (this.board[this.x + this.range[i][0]][this.y + this.range[i][1]] > 0) {
            return true;
          } else { return false };
        };
        if (result() === true) { lifeConditionCount++};
      };
      return lifeConditionCount
      };
    };

class Game {
  constructor(board, state){
  this.board = board;
  this.state = state;
  };
  start(){
    let tempBoard = [];
      // let play = setInterval(() => { 

        for (let x = 0; x < board.length; x += 1) {
          tempBoard.push([0]);
          for (let y = 0; y <board.length; y += 1) {
            let lifeConditionCount = new LifeCounter(this.board, x, y).count;
            // life conditions for cells
            if (lifeConditionCount === 3) {tempBoard[x][y]=1}
            else if (this.board[x][y] === 1 && lifeConditionCount === 2) {tempBoard[x][y]=1}
            else {tempBoard[x][y]=0};
            // if (lifeConditionCount > 3 || lifeConditionCount < 2 ) {tempBoard[x][y]=0};
          };
        };
        this.board = [].concat(tempBoard);
        setGameBoardDisplay(gameBoardUpdate());

      // },1000);
  };
};

  let game = new Game(board, false);

  let gameStartStop = () => {
    if (game.state === false){
      game.state = true;
    }else{game.state = false};
    if(this.state === true){console.log(this.state); setTimeout(game.start(), 10000)};
    console.log(game.state);
    document.getElementById("myBtn").disabled = !document.getElementById("myBtn").disabled;
    document.getElementById("myBtn2").disabled = !document.getElementById("myBtn2").disabled;
  };

  return (
    <>
      <div className={styles.board}>
        <button id="myBtn" onClick={gameStartStop}> Start life! </button>
        <button id="myBtn2" disabled ={true} onClick={gameStartStop}> Stop life! </button>
        <div><br></br></div>
        {gameBoardDisplay}
      </div>
    </>
  )
}
export default App;