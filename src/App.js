import React, { useState } from 'react'
import './App.css'
import Board from './components/Board/Board'

/**
 * This program is about the Tic Tac Toe NxN game
 */
function App() {
  const [initBoardSize, setInitBoardSize] = useState(null)
  const [boardSize, setBoardSize] = useState(null)
  const [start, setStart] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setBoardSize(initBoardSize)
    setStart(true)
  }

  return (
    <div className="App">

      <h1 className='title'> TIC TAC TOE GAME NxN</h1>
      <h2 className='label'>Introduce board size: </h2>
      <div className='data'>
          <input 
            type="text" 
            placeholder="Please enter a number" 
            id="size-square"
            onChange={(e) => setInitBoardSize(e.target.value)}/>
          <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>Start Game</button>      
      </div>
      { start ? <div className="init-board"> <Board boardSize={boardSize} /></div>:<p>Introduce only a number please</p>}
    </div>
  )
}
export default App