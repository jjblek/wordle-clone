import { Box } from "@mui/material"
import { useTheme } from "@emotion/react";

const GuessBox = ({letter, color, dim=60}) => {
    const theme = useTheme()

    const boxColor = 
        color === 'green' ? theme.palette.correct.main : 
        color === 'yellow' ? theme.palette.present.main :
        color === 'grey' ? theme.palette.absent.main  : null

    return (letter ?
        <Box className={`filled ${color}`}
            sx={{
                width: dim, 
                height: dim,
                display: 'flex', 
                alignItems: 'center', justifyContent: 'center',
                border: `3px solid ${theme.palette.grey[500]}`, 
                m: 0.4, padding: 0,
                flexGrow: 1,
                maxWidth: dim,
                maxHeight: dim,
                typography: 'h1', 
                textTransform: 'uppercase',
                fontSize: '2.5em', 
                fontWeight: 'bold',  
                fontFamily: 'Monospace',
                userSelect: 'none',
                
                '@keyframes flip': {
                    '0%': {
                        transform: 'rotateX(0)',
                        background: theme.palette.background.paper,
                        borderColor: '#3a3a3c',
                    },
                    '45%': {
                        transform: 'rotateX(90deg)',
                        background: theme.palette.background.paper,
                        borderColor: '#3a3a3c',
                        color: '#eee',
                    },
                    '55%': {
                        transform: 'rotateX(90deg)',
                        background: 'var(--background)',
                        borderColor: 'var(--border-color)',
                    },
                    '100%': {
                        transform: 'rotateX(0)',
                        background: 'var(--background)',
                        borderColor: 'var(--border-color)',
                        color: '#eee',
                    }
                },
                '@keyframes bounce': {
                    '0%': {
                        transform: 'scale(1)',
                        borderColor: '#ddd',
                    },
                    '50%': {
                        transform: 'scale(1.2)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        borderColor: '#3a3a3c',
                    },
                },
                animation: 'flip 0.5s ease forwards',
                '--background': boxColor,
                '--border-color': boxColor,
            }}
        >
            {letter}
        </Box> : 
        <Box className={'empty'}
            sx={{display: 'flex',
            width: dim, height: dim,
            flexGrow: 1,
            userSelect: 'none',
            border: `3px solid ${theme.palette.grey[600]}`,
            maxWidth: dim,
            maxHeight: dim,
            m: 0.4,
            padding: 0,
            }}
        >
        </Box>

    )
}

export default GuessBox