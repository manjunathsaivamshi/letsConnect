import { createTheme } from '@mui/material/styles'
import { lightBlue, purple } from '@mui/material/colors'

const PaperTheme = () => 
    createTheme({
        components:{
            MuiPaper:{
                defaultProps:{
                    elevation : 10
                },
                styleOverrides:{
                    root:{
                        backgroundColor: purple[50],
                    
                    },
                }
            }
        }
    })


export default PaperTheme
