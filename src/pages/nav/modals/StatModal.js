import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BarChartIcon from '@mui/icons-material/BarChart';
import {Box, Typography, Modal, Slide, IconButton} from '@mui/material'

const style = {
    position: 'absolute',
    top: '15%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
    maxWidth: '520px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    padding: '48px 20px 32px 20px',
};

export default function StatModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box display='inline'>
        <IconButton onClick={handleOpen} color='inherit'>
            <BarChartIcon/>
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
                    
                    <Typography id="modal-modal-title" variant="p" fontWeight='bold'>
                        STATISTICS
                    </Typography>
                    <Typography>
                        WIP
                    </Typography>
                </Box>
            </Slide>
        </Modal>
        </Box>
        
        
    );
}