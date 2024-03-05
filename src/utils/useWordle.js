import { useState } from 'react'
import { useTheme } from '@emotion/react'

const useWordle = (word) => {
    // game states
    const [turn, setTurn] = useState(0)
    const [guesses, setGuesses] = useState([...Array(6)])
    const [currentGuess, setCurrentGuess] = useState('')
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})
    const [rowShake, setRowShake] = useState(false);

    const theme = useTheme()
    const handleColor = (color) => {
        
        return (
            color === 'green' ? 
                theme.palette.correct.main : 
            color === 'yellow' ? 
                theme.palette.present.main : 
            color === 'grey' ? 
                theme.palette.absent.main : null
        )
    }

    const formatGuess = () => {
        let wordArray = [...word]
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'}
        })

        // find any green letters (letters in the word at the correct position)
        formattedGuess.forEach((letter, i) => {
            if (wordArray[i] === letter.key) {
                formattedGuess[i].color = 'green';
                wordArray[i] = null;
            }
        })

        // find any yellow letters (letters in the word but not at the correct position)
        formattedGuess.forEach((letter, i) => {
            if (wordArray.includes(letter.key) && 
                letter.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                wordArray[wordArray.indexOf(letter.key)] = null;
            }
        })

        return formattedGuess;
    }

    const addNewGuess = (guess) => {
        if (currentGuess === word) {
            setIsCorrect(true);
        }
        // set guesses
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = guess;
            return newGuesses;
        })

        // set guess history
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        })

        // increment turn
        setTurn((prevTurn) => {
            return prevTurn + 1;
        })
        
        setUsedKeys((previouslyUsedKeys) => {
            let newKeys = {...previouslyUsedKeys};
            guess.forEach((letter) => {
                const currentColor = newKeys[letter.key];
                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green';
                    return;
                }
                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow';
                    return;
                }
                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey';
                    return;
                }
            })
            return newKeys;
        })

        // clear current guess
        setCurrentGuess('')
    }

    // handle key events & track current guess
    const handleKeyup = ({ key }) => handleKeyboard(key)

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyboard = (key) => {
        if (key === 'Enter') {
            // only add guess if turn is less than 5
            if (turn > 5) {
                console.log('all guesses used')
                return 
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('you already tried that word')
                // begins to shake
                setRowShake(true);
                
                // stops to shake after 1 second
                setTimeout(() => setRowShake(false), 1000);
                return
            }
            // check that word is 5 characters long
            if (currentGuess.length !== 5) {
                console.log('word must be 5 characters long')
                // begins to shake
                setRowShake(true);
                
                // stops to shake after 1 second
                setTimeout(() => setRowShake(false), 1000);
                return
            }
            addNewGuess(formatGuess())
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            })
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    }

    return {
        turn,
        currentGuess, 
        guesses, 
        isCorrect, 
        usedKeys, 
        rowShake,

        handleKeyup, 
        handleKeyboard, 
        handleColor
    }
}

export default useWordle