
import {Box, Typography} from "@mui/material";
import SettingsModal from './modals/SettingsModal'
import HelpModal from "./modals/HelpModal";
import StatModal from "./modals/StatModal";
import TemporaryDrawer from './Menu';
import { useTheme } from "@emotion/react";
const TopBanner = (props) => {
    const theme = useTheme()
    return (  
        <Box sx={{
            display: 'flex',
            margin:'auto',
            flexDirection:'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid #d3d6da',
            height: '64px',
            padding: '0px 20px',
            position: 'relative',
            zIndex: theme.zIndex.drawer + 1
        }}>
            <Box sx={{marginRight: 'auto', }}>
                <TemporaryDrawer />
            </Box>
            
            
            <Typography fontFamily='Bevan' pl='90px' variant='h4'>
                Wordle
            </Typography>
            
            <Box ml='auto'>
                
                <HelpModal />

                <StatModal/>

                <SettingsModal {...props}/>

            </Box>
        </Box>
            
            
            
    )
}

export default TopBanner;
