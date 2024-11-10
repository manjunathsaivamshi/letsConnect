import { Grid, CssBaseline } from "@mui/material"
import Dial from "../dialbar/dial"
import Sidebar from "../signin/Sidebar"

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
          sx={{backgroundImage:'url("/letsConnect/home_bg.jpeg")'}}
        >
        <Dial></Dial>
        </Grid>
        <Sidebar />
        </Grid>
      </>
  )
}

export default Home
