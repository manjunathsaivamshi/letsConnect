import { Grid,Box, Button, Typography, TextField } from "@mui/material"
import IconsMenu from "../utils/IconsMenu"
import LinkIcon from '@mui/icons-material/Link'
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import GroupIcon from '@mui/icons-material/Group';
import { iconsMenu } from "../types/IconsMenu";
import { useEffect, useRef, useState } from "react";


export default function Dial() {
  const [dailBtnfc,setDailBtnfc]=useState(false)
  const dailRef = useRef<HTMLDivElement>(null);

  const meetingIcons = [<LinkIcon/>,<WatchLaterIcon/>,];
  const meetingTitles = ['Start Instant Meeting', 'Create Meeting for Later']
  const meetingButton : iconsMenu = {
    icons:meetingIcons,
    titles:meetingTitles
  }
  const handleDailBtn = () =>{
    setDailBtnfc(true)
  }

  const handleClick = (event:MouseEvent)=>{
      if (dailRef.current && !dailRef.current.contains(event.target as Node)) {
        setDailBtnfc(false)
        console.log('hi')
      } 
    }
    
  useEffect(()=>{

    document.addEventListener('mousedown', handleClick);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };

  },[dailBtnfc])

  
  return (
    <Grid container sx={{ height: '20vh', mt:'20vh'}}>
          <Grid
          item
          xs={12}
          sm={4}
          md={5}
         sx={{display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}
        >
          { !dailBtnfc && 
          <Button disableFocusRipple startIcon={<GroupIcon/>} onClick={handleDailBtn}
          sx={{mt:5,bgcolor:'secondary.main', color:'white',width:'80%',height:'40%',textTransform:'none'}}>
            <Typography variant="body2">Lets Connect</Typography>
            </Button>
            }
          {
          dailBtnfc && <div style={{marginTop: '5%'}} ref={dailRef}><IconsMenu  {...meetingButton}></IconsMenu></div>
          }
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
        >
          <Box component="form" noValidate  sx={{ mt: 2.5,width:'50%', height:'50%',ml:5 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="roomId"
                label={<GroupIcon/>}
                name="roomId"
                autoFocus
              />
            </Box>
        </Grid>
        </Grid>
  )
}
