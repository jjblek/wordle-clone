import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { topRow, middleRow, bottomRow } from "../utils/keyboardRows";
import { useTheme } from "@emotion/react";


const StyledKeyboardButton = styled(Button)(({ theme, f, c }) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : 
        c !== theme.palette.keyboard.main ? '#fff' : '#000',
    //backgroundColor: '#8d8e8e',
    backgroundColor: c,
    '&:hover': {
        backgroundColor: c,
        backdropFilter: 'brightness(85%)'
    },
    transition: 'all 0.3s ease-in',
    minWidth: '20px',
    flexGrow: 1,
    padding: 0,
    margin: '0 6px 0 0',
    height: '58px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: f,
    border: 0,
    borderRadius: '4px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    userSelect: 'none',
    '&:last-of-type': {
        margin: 0,
    },
    paddingBlock: '1px',
    paddingInline: '6px'
}));

const BackspaceIcon = ({theme, isCorrect}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
    >
        <path
            fill={isCorrect ? theme.palette.text.disabled : theme.palette.text.primary}
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
        ></path>
    </svg>
);

const KeyboardButton = (props) => {
    const letter = props.letter
    const theme = useTheme()
    
    const handleColor = (c) => {
        return c === 'green' ? theme.palette.correct.main : 
        c === 'yellow' ? theme.palette.present.main : 
        c === 'grey' ? theme.palette.absent.main : 
        theme.palette.keyboard.main
    }

    return (
        <StyledKeyboardButton
            theme={theme} disabled={props.isCorrect?true:false}
            onClick={() => props.handleKeyboard(letter)} 
            c={handleColor(props.usedKeys[letter])} 
            f={["Enter", "Backspace"].includes(letter) ? 1.5 : 1}>
                {letter === "Backspace" ? 
                    <BackspaceIcon theme={theme} isCorrect={props.isCorrect}/> : 
                letter === 'Enter' ?
                    <Typography 
                        fontFamily={'monospace'} 
                        fontSize={'16px'} 
                        fontWeight={'bold'}>
                            enter
                    </Typography> : 
                    <Typography 
                        fontFamily={'monospace'} 
                        fontSize={'26px'} 
                        fontWeight={'bold'}>
                            {letter}
                    </Typography>
                }
        </StyledKeyboardButton>
    )
}

const KeyboardRow = (props) => {
    return (
        <Box className='keyboardRow'
            sx={{ display: 'flex', width: '100%',
                margin: '0 auto 8px',
            }}>
            {props.row === middleRow && <Box flex={0.5}></Box>}
            {props.row.map((letter, idk) => (
            
            <KeyboardButton 
                key={letter.key} 
                letter={letter.key}
                usedKeys={props.usedKeys}
                handleKeyboard={props.handleKeyboard}
                isCorrect={props.isCorrect}>
            </KeyboardButton>
            ))}
            {props.row === middleRow && <Box flex={0.5}></Box>}
        </Box>
    )
}

const Keyboard = (props) => {
    return (

            <Box className='keyboard' 
                sx={{mt: '32px',
                    height: '200px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',   
                }}>
                <KeyboardRow row={topRow} {...props}/>
                <KeyboardRow row={middleRow} {...props}/>
                <KeyboardRow row={bottomRow} {...props}/>
            </Box>

    )
}

export default Keyboard;
