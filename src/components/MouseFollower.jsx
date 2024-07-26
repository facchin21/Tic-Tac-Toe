import { useEffect, useState } from "react"
import { TURNS } from "../constants"

export const MouseFollower = ({turn, setTurn}) => {
    const [position, setPosition] = useState({x : 0, y : 0})
  
    useEffect(() => {
      const handleMove = (event) => {
        const {clientX, clientY} = event
        setPosition({x: clientX , y: clientY})
      }

        window.addEventListener('pointermove', handleMove)

        return () => {
          window.removeEventListener('pointermove' , handleMove)
        }
    },[])
    return(
        <div className={`cursor-follower ${turn === TURNS.X ? 'x-cursor' : 'o-cursor'}`}
             style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <h1>{turn}</h1>
        </div>
    )
}