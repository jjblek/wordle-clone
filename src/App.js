import {useEffect, useState} from "react";
import Keyboard from "./pages/Keyboard";
import GuessArea from "./pages/GuessArea";
import TopBanner from "./pages/nav/TopBanner";
import {Box} from "@mui/material";
import useWordle from './utils/useWordle'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const data = require('./data/fiveLetterWords.json');

const getDesignTokens = (mode, contrast) => ({
    palette: {
        mode,
        ...(mode === 'light' ? {
                // palette values for light mode
                correct: {main: contrast ? '#f5793a' : '#6aaa64'},
                present: {main: contrast ? '#85c0f9' : '#c9b458'},
                absent: {main: '#787c7e'},
                keyboard: {main: '#d3d6da'},
                text: {
                    primary: '#212121', 
                    secondary: 'rgba(0,0,0,0.6)', 
                    disabled: 'rgba(0,0,0,0.12)'
                }
            } : {
                // palette values for dark mode
                correct: {main: contrast ? '#f5793a' : '#538d4e'},
                present: {main: contrast ? '#85c0f9' : '#b59f3b'},
                absent: {main: '#3a3a3c'},
                keyboard: {main: '#8d8e8e'},
                text: {
                    primary: '#fff', 
                    secondary: 'rgba(255,255,255,0.6)', 
                    disabled: 'rgba(255,255,255,0.3)'
                }
            }),
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                'Bevan',

            ].join(','),
        }
});


function App() {
    const [word, setWord] = useState(null);
    
    // The light theme is used by default
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isContrastMode, setIsContrastMode] = useState(false);
    
    // This function is triggered when the Switch component is toggled
    const changeTheme = () => { setIsDarkTheme(!isDarkTheme); };
    const changeContrast = () => { setIsContrastMode(!isContrastMode);};
    
    useEffect(() => {
        const random = data.words[Math.floor(Math.random() * data.words.length)];
        setWord(random)

    }, [setWord]);

    // Wordle Hooks
    const {
        turn, 
        guesses, 
        currentGuess,
        isCorrect, 
        usedKeys,
        rowShake,
        handleKeyup,
        handleKeyboard,
    } = useWordle(word)
    
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        if (isCorrect) {
            console.log("You've guessed correctly!")
            window.removeEventListener('keyup', handleKeyup)
        }
        else if (turn > 5) {
            console.log("You've run out of guesses!")
            window.removeEventListener('keyup', handleKeyup)
        }
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn]);

    console.log(word)

    return (
        <ThemeProvider 
            theme={isDarkTheme ? 
                createTheme(getDesignTokens('dark', isContrastMode)) : 
                createTheme(getDesignTokens('light', isContrastMode))
            }>
            <CssBaseline />
            <>
                <TopBanner 
                    isDarkTheme={isDarkTheme} 
                    changeTheme={changeTheme} 
                    isContrastMode={isContrastMode}
                    changeContrast={changeContrast}
                />

                {word && 
                    <Box display='flex' flexDirection='column'
                        margin="0 auto" maxWidth='500px'>
                        
                        <Box display='flex' justifyContent='center'>
                            <GuessArea turn={turn}
                                currentGuess={currentGuess}
                                guesses={guesses}
                                rowShake={rowShake} />
                        </Box>
                    
                        <Keyboard usedKeys={usedKeys} 
                            isCorrect={isCorrect} 
                            handleKeyboard={handleKeyboard} />
                    </Box>
                }
            </>
        </ThemeProvider>
    );
}

export default App;
