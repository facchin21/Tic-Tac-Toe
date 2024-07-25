import { saveGameToStorage, resetGameStorage, savePointsToStorage, resetPointsToStorage } from './logic/storage/index'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Turns } from './components/Turns'
import { Board } from './components/Board'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { useState } from 'react'
import './App.css'
import { Points } from './components/Points'

function App() {
  const title = 'Tic Tac Toe'
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnsFromStorage = window.localStorage.getItem('turn')
    return turnsFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const [points, setPoints] = useState(() => {
    const pointXFromStorage = window.localStorage.getItem('pointX')
    const pointOFromStorage = window.localStorage.getItem('pointO')
    return {
      [TURNS.X]: pointXFromStorage ? parseInt(pointXFromStorage, 10) : 0,
      [TURNS.O]: pointOFromStorage ? parseInt(pointOFromStorage, 10) : 0
    }
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => { 
    if (board[index] || winner) return 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      const newPoints = {
        ...points,
        [newWinner]: (points[newWinner] || 0) + 1
      }
      setPoints(newPoints)
      savePointsToStorage(newPoints)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  const resetPoints = () =>{
    resetPointsToStorage()
    setPoints({
      [TURNS.X]: 0,
      [TURNS.O]: 0
    })
  }

  return (
    <main className='board'> 
      <h1>{title}</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board board={board} updateBoard={updateBoard}/>
      <Turns turn={turn}/>
      <Points pointX={points[TURNS.X]} pointO={points[TURNS.O]}/>
      <WinnerModal winner={winner} resetGame={resetGame}/>
      <button onClick={resetPoints}>Reset de puntos</button>
    </main>
  )
}

export default App
