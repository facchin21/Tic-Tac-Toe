import { TURNS } from '../constants'
import { Square } from './Square'
export const Points = ({pointX, pointO}) =>{

    return(
        <>
            <h2>Puntos Totales:</h2>
            <section className='turn'>
            <Square>
                 {TURNS.X}:
            </Square>
                <Square>
                    {pointX}
                </Square>
                <Square>
                    {TURNS.O}:
                </Square>
                <Square>
                    {pointO}
                </Square>
            </section>
        </>
    )
}