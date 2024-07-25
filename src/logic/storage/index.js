
export const saveGameToStorage = ({ board, turn}) => {    
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const savePointsToStorage = (points) => {
    window.localStorage.setItem('pointX', points['×'])
    window.localStorage.setItem('pointO', points['○'])
}

export const resetPointsToStorage = () =>{
    window.localStorage.removeItem('pointX')
    window.localStorage.removeItem('pointO')
}
