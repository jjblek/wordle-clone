import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import GuessRow from "./GuessRow";

const GuessArea = (props) => {
    const theme = useTheme();
    // get word from props

    return (
        <Box display='flex' minWidth='200px'
            flexDirection='column'
            sx={{
                paddingTop: '20px',
                [theme.breakpoints.down('sm')]: {
                    paddingTop: '10px',
                }
            }}
            >
            {props.guesses.map((guess, idx) => {
                    if (props.turn === idx) {
                        return (
                            <GuessRow key={idx} 
                                currentGuess={props.currentGuess} 
                                rowShake={props.rowShake}
                            />
                        )
                    }
                    return <GuessRow key={idx} guess={guess} />
                }
            )}
            
        </Box>
    )
}

export default GuessArea;