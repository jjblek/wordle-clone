import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PortraitIcon from '@mui/icons-material/Portrait';
export default function TemporaryDrawer() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };

    const list1 = [
        [<SchoolIcon />, 'Sonoma State University', 'https://www.sonoma.edu/'], 
        [<ClassIcon />, 'CS 470 - Advanced Software Design', 'https://catalog.sonoma.edu/preview_course_nopop.php?catoid=9&coid=44164']
    ]

    const list2 = [
        [<PortraitIcon/>, 'Web Portfolio', ''], 
        [<LinkedInIcon/>, 'LinkedIn', 'https://www.linkedin.com/in/blechelj/'], 
        [<AlternateEmailIcon/>, 'blechelj@sonoma.edu', '']
    ]

    const list = (anchor) => (
    <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 375 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <Box display='flex'
            justifyContent='space-between'
            alignItems='center'
            pr={1}
        >
            <Typography 
                variant='h6' p={2} 
                fontWeight='bold' 
                fontFamily='Bevan'>
                    CS 470
            </Typography>
        
            <IconButton 
                onClick={
                    toggleDrawer(anchor, false)
                }
                size='sm'>
                <CloseIcon/>
            </IconButton>
        
        
        </Box>
        
        
        <List>
            {list1.map((item, index) => (
                <ListItem key={index} disablePadding>
                <ListItemButton href={item.at(2)} target="_blank" rel="noreferrer">
                    <ListItemIcon>
                        {item.at(0)}
                    </ListItemIcon>
                    <ListItemText primary={item.at(1)} />
                </ListItemButton>
                </ListItem>
            ))}
        </List>

        <Divider />
        
        <List>
            {list2.map((item, index) => (
                <ListItem key={index} disablePadding>
                <ListItemButton href={item.at(2)} target="_blank" rel="noreferrer">
                    <ListItemIcon>
                        {item.at(0)}
                    </ListItemIcon>
                    <ListItemText primary={item.at(1)} />
                </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
    );

    return (
        <Box >
            <IconButton onClick={toggleDrawer('left', true)}>
                <MenuIcon sx={{marginRight: 'auto'}}/>
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                
                PaperProps={{
                    
                    sx: {
                        backgroundColor: '',
                        height: 'calc(100% - 64px)',
                        maxHeight: '500px',
                        top: 64,
                    },
                    
                }}
                slotProps={{
                    backdrop: {
                        invisible: true
                    }
                }}
            >
            {list('left')}
            </Drawer>
        </Box>
    );
}