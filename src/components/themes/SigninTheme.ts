import { createTheme } from '@mui/material/styles'
import { signIn } from '../types/SignIn'

const SignInTheme = (isSignIn:signIn) => 
    createTheme({
        components:{
            MuiTextField:{
                styleOverrides:{
                    root:{
                        
                    },
                }
            }
        }
    })


export default SignInTheme
