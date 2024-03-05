import { Fragment, useState } from 'react';
import IOSSwitch from './IOSSwitch'
import settings from '../../../utils/settings'
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box, Typography, Modal, Slide, 
    List, ListItem, ListItemText, 
    Divider, IconButton, Link 
} from '@mui/material'
import { useTheme } from '@emotion/react';
const CustomList = ({isDarkTheme, changeTheme, isContrastMode, changeContrast}) => {

    return (
        <List sx={{fontSize: '18px'}}> 
        {settings.map((item, idx) => {
            return (
                <Fragment key={idx}>
                    <ListItem disablePadding sx={{height:'60px'}}>
                        <ListItemText>
                            <Typography fontSize='18px' fontWeight={'medium'}>
                                {item.label}
                            </Typography>
                            <Typography variant='caption' sx={{color: '#818384'}}>
                                {item.description}
                            </Typography>
                        </ListItemText>
                        
                        {item.functionality === 'switch' ?
                            <IOSSwitch edge="end" disabled={idx===0}
                                checked={idx === 1 ? isDarkTheme : idx === 2 ? isContrastMode : null} 
                                onChange={idx === 1 ? changeTheme : idx === 2 ? changeContrast : null}/>
                            : (item.functionality === 'email') ? 
                                <Link underline='none' color={'#818384'}>Email</Link> : 
                                <Link target="_blank" rel="noreferrer" href={item.link} underline='none' color={'#818384'}>
                                    {idx === 5 ? 'Wordle Review' : 'FAQ'}
                                </Link>
                        }
                    </ListItem>
                    <Divider/>
                </Fragment>
            )
        })}
        </List>
    )
}

export default function SettingsModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme()
    
    const modalStyle = {
        position: 'absolute',
        top: '15%',
        //left: '50%',
        //transform: 'translate(-50%, -50%)',
        width: '520px',
        [theme.breakpoints.down('sm')]: {
            width: '350px',
        },
        
        margin: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '10px',
        padding: '18px 20px 32px 20px',
    };

    return (
        <Box display='inline'>
        <IconButton onClick={handleOpen} color='inherit'>
            <SettingsIcon/>
        </IconButton>
        <Modal 
            sx={{display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}
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
                <Box sx={modalStyle}>
                    <Box sx={{textAlign: 'center'}}>
                    
                        <Typography id="modal-modal-title" variant="h6" fontWeight='bold'>
                            SETTINGS
                        </Typography>
                    
                        <Box position='absolute' top={14} right={14}>
                            <IconButton onClick={handleClose} size='sm'>
                                <CloseIcon/>
                            </IconButton>
                        </Box>

                        <CustomList theme={theme} {...props}/>
                    </Box>
                    
                    <Box display='flex' justifyContent='space-between' mt={1}>
                        <Typography color='#818384' 
                            variant='caption' 
                            id="modal-modal-description">
                            ©&nbsp; 2023 Justin Blechel
                        </Typography>
                        <Typography color='#818384' 
                            variant='caption' 
                            id="modal-modal-description">
                            #470
                        </Typography>
                    </Box>
                </Box>
            </Slide>
        </Modal>
        </Box>
        
        
    );
}