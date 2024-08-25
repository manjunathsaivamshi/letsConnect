import { Grid, CssBaseline,Box } from "@mui/material"
import Signin from "../signin/Signin"
import Dial from "../dialbar/dial"

const Home = () => {
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh'}} >
        <CssBaseline />
          <Grid
          item
          xs={12}
          sm={8}
          md={7}
          sx={{backgroundImage:'url("/home_bg.jpeg")'}}
        >
        <Dial></Dial>
        </Grid>
        <Signin />
        </Grid>
      </>
  )
}

export default Home
