import { Box } from "@mui/material"
import GuessBox from "./GuessBox"

const GuessRow = (props) => {
    
    if (props.guess) {
        return (
            <Box className='row past' display='flex' minWidth='200px'>
                {props.guess.map((l, i) => {
                    return (
                        <GuessBox key={i} 
                            color={l.color} 
                            letter={l.key}
                        />
                    )
                })}

            </Box>
        )
    }
    if (props.currentGuess) {
        let letters = props.currentGuess.split('')
        return (
            <Box className={props.rowShake ? `row current shake` : 'row current'} display='flex' minWidth='200px'>
                {letters.map((l, i) => (
                    <GuessBox key={i}
                        letter={l}
                    /> 
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <GuessBox key={i} />
                    )
                )}
            </Box>
        )
    }
    return (
        <Box className='row empty' display='flex' minWidth='200px' flexGrow={1}>
            {[...Array(5)].map((_, i) => {
                return <GuessBox key={i} />
            })}
        </Box>
    )
}

export default GuessRow