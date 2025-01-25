import { Grid, CssBaseline } from "@mui/material"
import Dial from "../dialbar/dial"
import Sidebar from "../signin/Sidebar"
import { useEffect, useRef, useState } from "react"

const Home = () => {
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh'}} >
        <CssBaseline />
          <Grid
          item
          xs={0 }
          sm={4}
          md={8}
          sx={{backgroundImage:'url("/home_bg.jpeg")', display:{xs:'none', sm: 'block'}}}
        >
        <Dial></Dial>
        </Grid>
        <Sidebar />
        </Grid>
      </>
  )
}

export default Home
