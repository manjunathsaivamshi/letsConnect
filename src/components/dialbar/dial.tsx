import { Grid,Box, Button, Typography, TextField } from "@mui/material"
import IconsMenu from "../utils/IconsMenu"
import LinkIcon from '@mui/icons-material/Link'
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import GroupIcon from '@mui/icons-material/Group';
import { iconsMenu } from "../types/IconsMenu";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from '../../soc'
import { v4 as uuidV4 } from "uuid";



export default function Dial() {
  const [dailBtnfc,setDailBtnfc]=useState(false);
  const [roomFlag,setRoomFlag]=useState(false);
  const [roomIdGiven,setRoomIdGiven]=useState("");
  const roomidref = useRef<any>();
  const byJoin = useRef<number>(0);

  const dailRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  const handleStartInstantMeeting = async ()=>{
    const userId = uuidV4();
    await socket.emit('create-room')
    await socket.on("room-created",async (roomId:any)=>
      {
        navigate(`/room/${roomId.roomId}/${userId}`)
      });
    //console.log(roomIdGiven);
  }

  const handleJoinTheMeeting = ()=>{
    const userId = uuidV4();
    navigate(`/room/${roomIdGiven}/${userId}`)
    }

  const handleRoomIdGiven = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    setRoomIdGiven(e.target.value);
  }
  // const handleJoinMeeting = ()=>{
  //   byJoin.current = 1;
  //   roomIdGiven.trim().length>0 ? navigate(`/room/${roomIdGiven}/${byJoin.current}`):alert('Invalid RoomID')
  // }

  const handleDailBtn = () =>{
    setDailBtnfc(true)
  }

  const handleClick = (event:MouseEvent)=>{
      if (dailRef.current && !dailRef.current.contains(event.target as Node)) {
        setDailBtnfc(false)
      } 
    }

  const meetingIcons = [<LinkIcon/>,<WatchLaterIcon/>,<JoinFullIcon/>];
  const meetingTitles = ['Start Instant Meeting','Join the Meeting','Create Meeting for Later']
  const meetingClicks = [handleStartInstantMeeting,handleJoinTheMeeting,()=>{}]
  const meetingButton : iconsMenu = {
    icons:meetingIcons,
    titles:meetingTitles,
    onClicks:meetingClicks
  }
    
  useEffect(()=>{

    document.addEventListener('mousedown', handleClick);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };

  },[dailBtnfc])

  
  return (
    
    <Grid container sx={{ height: '20vh', mt:'25vh'}}>
      
          <Grid
          item
          xs={12}
          sm={4}
          md={5}
         sx={{display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'}}
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
            <Typography sx={{fontFamily: 'BlinkMacSystemFont',color:'white'}} variant="h5">Enter the Room ID</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="roomId"
                label={<GroupIcon/>}
                name="roomId"
                variant="outlined"
                autoFocus
                onChange={(e) => handleRoomIdGiven(e)}
              />
              
            </Box>
        </Grid>
        </Grid>
  )
}
