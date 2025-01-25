import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid,Paper, Typography,Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Signin from './Signin';
import './sidebar.css'

export default function Sidebar() {
    const [signIn,setSignIn] = useState(true);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    })};

    const handleIsSignIn = () => {
        setSignIn(!signIn)
    }

  return (
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Button className="semicircular-button" >
            dss
          </Button>
        </Grid>
  );
}
