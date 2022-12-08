import React, { useState } from 'react'
import Square from '../Square/Square'
import './Board.css'

function Board( {boardSize} ) {
  
  const [squares, setSquares] = useState(Array(boardSize*boardSize).fill(null))
  const [nextTurn, setNextTurn] = useState(true) //It start with X

/** 
 * This function send the information about which square was clicked.
 */ 
  const displaySquares = n => {
    document.documentElement.style.setProperty('--boards', `${boardSize}`)
    const initSquares = []
    for(let i = 0; i < n*n; i++) {
      initSquares.push(<Square key={i}  value={squares[i]} handleClick={() => handleClick(i)}  />)
    }
    return initSquares
  }

  /**
   * This function fills square with X or O when click
   */
  const handleClick = i => {

    const newSquares = [...squares]
    // return if match ended or square already filled
    if(winCalculation(squares) || squares[i]) {
      return
    }
    newSquares[i] = nextTurn ? 'X' : 'O'
    setSquares(newSquares)
    setNextTurn(!nextTurn)
  }

  /**
   * This function describe the Wining movements 
   * it take into account, horizontal, vertical, and diagonals
   */
  function winners() {
    let size = parseInt(boardSize); // size of board ex.4
    let totalPositions = size * size; // ex. 16
    let varArr = size * 2;        // ex. 8
    let storeArr = new Array(varArr); 
    let diagonLine1 = '';   //one diagonal line
    let diagonLine2 = '';   //two diagonal line

    for (var j = 0; j < size; j++) { //0,1,2,3 -> j(4)
      let horiLine = '';    //horizontal line
      let vertiStrk = '';   //vertical line
      for (let i = 0; i < totalPositions; i++) {  //0,1,2...,14,15 -> i(16) 
        if (i / size === j) { // ex. 4 / 4 === 0 
          horiLine += i + ",";  
          for (let k = 1; k < size; k++) {
            horiLine += i + k + ",";            
          }
        }
        if (i % size === j) { //
          vertiStrk += i + ",";          
        }
      }
      horiLine = horiLine.substring(0, horiLine.length - 1);
      vertiStrk = vertiStrk.substring(0, vertiStrk.length - 1);
      let h = horiLine.split(",");  //ex  12,13,14,15 
      let v = vertiStrk.split(","); //ex  3,7,11,15
    
      storeArr[j] = v; //value of winners moves in vertical (4)
    
      storeArr[j + size] = h; //value of winners moves in horizont (4)

      diagonLine1 += j * (size + 1) + ","; //from left to right

      diagonLine2 += (j + 1) * (size - 1) + ","; //from right  to left
    }

    diagonLine1 = diagonLine1.substring(0, diagonLine1.length - 1);
    diagonLine1 = diagonLine1.split(",");
    storeArr.push(diagonLine1);

    diagonLine2 = diagonLine2.substring(0, diagonLine2.length - 1);
    diagonLine2 = diagonLine2.split(",");
    storeArr.push(diagonLine2);

    const winCondition = storeArr;
    return winCondition
  }

  function winCalculation(positions) { 
    const lines = winners()
    for(let i = 0; i < lines.length; i++) { //review each winning move ex. for n=4 -> 10 (0-9)
      for(let j = 0; j < lines[i].length; j++) {  //inside on each group analize its value individally 
        if(positions[lines[i][j]] && positions[lines[i][j]]) { //if a value exists -- if it isnt null or empty-> X&X ..O&O
          if(lines[i].every((val, index, arr) => positions[val] === positions[arr[0]])) {
            return positions[lines[i][j]] 
          }
          
        }
      }
    }
  }

  const winner = winCalculation(squares)

  return (
    <div>
      <h2 className="notice">{winner ? 'Congratulations the Winner is : ' + winner : 'Next Turn is: '+ (nextTurn ? 'X' : 'O')}</h2>
      <div className="board"> { displaySquares(boardSize) } </div>      
    </div>
  )
}

export default Board

