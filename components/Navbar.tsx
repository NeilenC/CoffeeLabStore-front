import { AppBar, Grid, IconButton, InputBase, Toolbar, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogOutOutlinedIcon from '@mui/icons-material/LogOutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { CartState, UserState } from '@/commons/types.interface';
import useUserData from '@/Hooks/useUserData';
import { clearUserInfo } from '@/redux/userInfo';
import { useRouter } from 'next/router';
import Image from 'next/image';
import chemex from '../public/chemex.jpg'
import Categories from './Categories';


const Navbar = () => {
  const cart = useSelector((state: CartState) => state.cart)
  useUserData()
  const user = useSelector((state: UserState) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUserInfo());
    router.push('/login');
  };



  return (
    <AppBar position="sticky">

      <Box  sx={{bgcolor:"#000000", color:"white"}}>
      <Toolbar>
        <Grid container alignItems="center" sx={{}}>
          <Grid item xs={4}>
            <Link
            href={'/'}>
            <Image
            src={chemex}
            height={60}
            width={70}
            alt={'logo'}
            />
            </Link>
          </Grid>
          <Grid item xs={6}>
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
            {!user?.id ?
          (
            <Box  sx={{cursor:'pointer', color:"white"}}
            onClick={()=> router.push('/login')}
            >LogIn <LoginOutlinedIcon/></Box>
            ) 
            : 
           ( <Box  sx={{cursor:'pointer', color:"white"}} onClick={handleLogout}>
           LogOut <LogOutOutlinedIcon/></Box>)
          }
          </Grid>
          <Grid item xs={1}>
      
            <Box
             sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
             onClick={handleCartClick}
             >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 24}} />
              <Box sx={{ pb: 3.5}}>
                <Box
                  sx={{
                    width: 17,
                    height: 17,
                    p: 0.5,
                    bgcolor: "white",
                    borderRadius: "50%", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 9, color: "black", fontWeight: "bold"}}>
                    {cart.cart.length}
                  </Typography>
                </Box>
              </Box>
            </Box>
       
          </Grid>
        </Grid>

      </Toolbar>
      </Box>
      <Categories/>
    </AppBar>
  );
}

export default Navbar