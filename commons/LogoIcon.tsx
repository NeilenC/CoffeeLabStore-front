import { Box, Grid, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const LogoIcon = () => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)')
    const isMediumScreen = useMediaQuery('(max-width: 1000px)')

  return (
    <Box >
    <Link href={"/"}>
      <Grid item sx={{ display: "flex", }} xs={2} md={12} sm={12} >
        <Box
          component="img"
          src="/chemexvector.png"
          alt="logo"
          sx={{ width:  isSmallScreen ? "50px" : "50px",  }}
   
        />
        <Box
          component="img"
          src="/Logo.png"
          alt="logo"
          sx={{
           width:  isSmallScreen || isMediumScreen  ? "100px" : "130px",
           height:  isSmallScreen || isMediumScreen ? "25px" : "30px",
           my: "auto"
           }}

          />
      </Grid>
    </Link>
  </Box>
  )
}

export default LogoIcon