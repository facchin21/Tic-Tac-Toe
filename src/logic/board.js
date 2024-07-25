import { TURNS ,WINNER_COMBOS, POINTS_WINNER } from "../constants";

export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
}

export const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ){
        return boardToCheck[a]
      }
    }
    return null
}

export const totalWinner = (winner) =>{
  if(winner !== null){
    if(winner === TURNS.X){
      POINTS_WINNER.totalWinnerX++;
    }else{
      POINTS_WINNER.totalWinnerO++;
    }
  }
}

