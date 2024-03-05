import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    Box, Typography, Modal, Slide, 
    Divider, IconButton
} from '@mui/material'
import GuessBox from '../../GuessBox';
const style = {
    position: 'absolute',
    top: '15%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
    maxWidth: '520px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    padding: '18px 20px 32px 20px',
};

export default function HelpModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const example1 = [
        {'key': 'w', 'color': 'green'},
        {'key': 'e', 'color': 'grey'},
        {'key': 'a', 'color': 'grey'},
        {'key': 'r', 'color': 'grey'},
        {'key': 'y', 'color': 'grey'}
    ]

    const example2 = [
        {'key': 'p', 'color': 'grey'},
        {'key': 'i', 'color': 'yellow'},
        {'key': 'l', 'color': 'grey'},
        {'key': 'l', 'color': 'grey'},
        {'key': 's', 'color': 'grey'}
    ]

    const example3 = [
        {'key': 'v', 'color': 'grey'},
        {'key': 'a', 'color': 'grey'},
        {'key': 'g', 'color': 'grey'},
        {'key': 'u', 'color': 'grey'},
        {'key': 'e', 'color': 'grey'}
    ]
    return (
        <Box display='inline'>
        <IconButton onClick={handleOpen} color='inherit'>
            <HelpOutlineIcon/>
        </IconButton>
        <Modal sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Slide direction="up" in={open} 
                mountOnEnter unmountOnExit 
                easing={{
                    enter: "cubic-bezier(0, 1.5, .8, 1)",
                    exit: "linear"
                }}
            >  
                <Box sx={style}>
                    
                    <Box position='absolute' top={14} right={14}>
                        <IconButton onClick={handleClose} size='sm'>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    
                    <Typography id="modal-modal-title" 
                        variant="h5" mt={3} mb='3px'
                        fontFamily='Bevan'>
                        How To Play
                    </Typography>
                    <Typography id="modal-modal-title" 
                        variant="h6" fontWeight='bold' ml='3px'>
                        Guess the Wordle in 6 tries.
                    </Typography>
                    <ul>
                        <li>Each guess must be a valid 5-letter word.</li>
                        <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    </ul>


                    <Box mb={3}>
                        <Typography fontWeight='bold'>Examples</Typography>

                        <Box display={'flex'} mt={1}>
                            {example1.map((letter, idx) => {
                                return <GuessBox key={idx} letter={letter.key} color={letter.color} dim={40}></GuessBox>
                            })}
                        </Box>
                        <span>
                            <Typography display='inline' fontWeight='bold' ml='3px'>
                                W
                            </Typography> is in the word and in the correct spot.
                        </span>

                        <Box display={'flex'} mt={1}>
                            {example2.map((letter, idx) => {
                                return <GuessBox key={idx} letter={letter.key} color={letter.color} dim={40}></GuessBox>
                            })}
                        </Box>
                        <span>
                            <Typography display='inline' fontWeight='bold' ml='3px'>
                                I
                            </Typography> is in the word but in the wrong spot.
                        </span>
                        
                        <Box display={'flex'} mt={1}>
                            {example3.map((letter, idx) => {
                                return <GuessBox key={idx} letter={letter.key} color={letter.color} dim={40}></GuessBox>
                            })}
                        </Box>
                        <span>
                            <Typography display='inline' fontWeight='bold' ml='3px'>
                                None
                            </Typography> of the letters are in the word.
                        </span>
                    </Box>
                    <Divider/>
                    <Typography p={2} sx={{textDecoration: 'line-through'}}>Log in or create a free account to link your stats</Typography>
                    <Divider/>
                    <Typography p={2}>Puzzles are generated from a static list of words.</Typography>
                </Box>
            </Slide>
        </Modal>
        </Box>
        
        
    );
}