import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid,Paper, Typography,Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Signin from './Signin';

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
        <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
            <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signIn? "Sign in":"Sign Up"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Signin isSignIn={signIn} />
                </Box>
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {signIn? "Sign In":"Sign Up"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button onClick={handleIsSignIn}>
                    {!signIn ? "Already have an account? Sign In":"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
              
            </Box>
          </Box> 
        </Grid>
  );
}
