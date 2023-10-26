import { AppBar, Grid, IconButton, InputBase, Toolbar, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogOutOutlinedIcon from '@mui/icons-material/LogOutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { UserState } from '@/commons/types.interface';

const Navbar = () => {
  const user = useSelector((state: UserState) => state.user)

  return (
    <AppBar position="static" sx={{bgcolor:"#000000", color:"white"}}>
      <Toolbar>
        <Grid container alignItems="center" sx={{}}>
          <Grid item xs={3}>
            <Typography variant="h6">Logo</Typography>
          </Grid>
          <Grid item xs={5}>
            <InputBase
            sx={{bgcolor:"white", width:"380px", px:1.5, borderRadius:"8px", border:"1px solid lightgrey"}}
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'Buscar' }}
              endAdornment={
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              }
            />
          </Grid>
          <Grid item xs={1}>
            {user?.id ?
          (<Link href={'/login'}>
            <Box  sx={{cursor:'pointer', color:"white"}}>LogIn <LoginOutlinedIcon/></Box>
            </Link>) 
            : 
           ( <Box  sx={{cursor:'pointer', color:"white"}}>LogOut <LogOutOutlinedIcon/></Box>)
          }
          </Grid>
          <Grid item xs={1}>
          {/* <Link href={'/cart/${cartId}'}> */}
            <Box sx={{cursor:'pointer'}}><ShoppingCartOutlinedIcon/></Box>
          {/* </Link> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar