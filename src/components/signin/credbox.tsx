

const CredBox = () =>{

    return (
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
    );
}

export default CredBox