import { POINTS_WINNER, TURNS } from "../../constants"

export const saveGameToStorage = ({ board, turn}) => {    
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const savePointsToStorage = (point) =>{
    if(point !== null){
        if(point === TURNS.X){
            window.localStorage.setItem('pointX',
                 POINTS_WINNER.totalWinnerX ++)
        }else if(point === TURNS.O){
            window.localStorage.setItem('pointO',
                POINTS_WINNER.totalWinnerO ++ )
        }
    }
}
