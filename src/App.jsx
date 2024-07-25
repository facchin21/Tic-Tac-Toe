import { saveGameToStorage, resetGameStorage, savePointsToStorage } from './logic/storage/index'
import { checkWinner, checkEndGame, totalWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Turns } from './components/Turns'
import { Board } from './components/Board'
import confetti from 'canvas-confetti'
import { POINTS_WINNER, TURNS } from './constants'
import { useState } from 'react'
import './App.css'
import { Points } from './components/Points'

function App() {
  const title = 'Tic Tac Toe'
    const [board, setBoard] = useState( () =>{
      const boardFromStorage = window.localStorage.getItem('board')
      return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })
    const [turn, setTurn] = useState( () =>{
      const turnsFromStorage = window.localStorage.getItem('turn')
      return turnsFromStorage ?? TURNS.X
    })
    const [winner, setWinner] = useState(null)

    const [pointX, setPointX] = useState(() =>{
      const pointFromStorage = window.localStorage.getItem('pointX')
      return pointFromStorage ?? POINTS_WINNER.totalWinnerX
    })
    const [pointO, setPointO] = useState(() =>{
      const pointFromStorage = window.localStorage.getItem('pointO')
      return pointFromStorage ?? POINTS_WINNER.totalWinnerO
    })

    const resetGame = () =>{
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
      resetGameStorage()
    }

    const updateBoard = (index) => { 
      if(board[index] || winner )return 
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      saveGameToStorage({
        board : newBoard,
        turn : newTurn
      })

      const newWinner = checkWinner(newBoard)
      if(newWinner){
        setWinner(newWinner)
        totalWinner(newWinner)
        savePointsToStorage(newWinner)
        confetti()
      }else if(checkEndGame(newBoard)){
        setWinner(false)
      }
    }

  return (
    <main className='board'> 
        <h1>{title}</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <Board board={board} updateBoard={updateBoard}/>
        <Turns turn={turn}/>
        <Points pointX={pointX} pointO={pointO}/>
        <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
