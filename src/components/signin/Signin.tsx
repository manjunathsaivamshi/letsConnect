import TextField from '@mui/material/TextField';
import { signIn } from '../types/SignIn';

export default function Signin(isSignIn:signIn) {
  return (
    <>
      {!isSignIn.isSignIn?
      <>
       <TextField
        margin="normal"
        required
        id="firstName"
        label="First Name"
        name="firstName"
        
      />
      <TextField
        margin="normal"
        required
        name="lastName"
        label="Last Name"
        id="lastName"
      /> 
      </>:<></>
    }
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        type="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      {!isSignIn.isSignIn?
      <>
       <TextField
        margin="normal"
        required
        fullWidth
        id="confirmpassword"
        label="Confirm Password"
        name="confirmpassword"
        type="password" />
      </>:<></>
    }
  </>    
  );
}
