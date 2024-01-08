import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogOutOutlinedIcon from "@mui/icons-material/LogOutOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import useUserData from "@/Hooks/useUserData";
import { clearUserInfo } from "@/redux/userInfo";
import { useRouter } from "next/router";
import Categories from "./Categories";
import Search from "./Search";
import theme from "../styles/theme";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import chemexVector from '../public/chemexVector.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';


const Navbar = () => {
  const cart = useSelector((state: CartState) => state.cart);
  useUserData();
  const user = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    setTimeout(() => {
      setExpanded(false);
    }, 5000);
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUserInfo());
    router.push("/login");
  };

  const goToUserData = () => {
    router.push("/userData");
  };
  const goToUserFavorites = () => {
    router.push("/favorites");
  };
  // #3E2723 marroncito oscuro
  // F5F5DC Beige
  // DAA520 amarillo tostado
  // 8B735B marron tostado claro

  useEffect(() => {
    if (router.pathname === '/cart') {
      setExpanded(false);
    }
  }, [router.pathname]);

  return (
    <Box >
 { router.pathname !== '/cart' ? (
    <AppBar position="sticky">
      <Box sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
        <Toolbar>
          <Grid container alignItems="center">
            <Box  sx={{ maxWidth:"28%"}} >
              <Link href={"/"}>
              <Box sx={{display:"flex"}}>
                <Box component="img"  src='/chemexvector.png' alt="logo" sx={{width:"13%", height:"10%"}} />
                <Box component="img"  src='/logo.png' alt="logo" sx={{width:"30%", height:"10%", my:"auto"}} />
              </Box>
              </Link>
            </Box>
            <Grid item xs={3}  >
              <Search />
            </Grid>
           

            <Grid item sx={{ ml: "15%", position: 'relative' }}>
  {user ? (
    <Box
      sx={{
        cursor: 'pointer',
        padding: '10px',
        margin: '10px',
      }}
    >
      <Typography onClick={handleToggle} sx={{ display: 'flex', alignItems: 'center' }}>
        Hola {user?.name}!
        <KeyboardArrowDownIcon />
      </Typography>
      {expanded && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'white',  // Puedes ajustar el color de fondo según tu diseño
            color:"white",
            width: "100%",
            p:2,
            pb:1,
            bgcolor: theme.palette.primary.main
          }}
        >
          <Typography onClick={goToUserData} variant="body2" sx={{pb:1}}>Tus datos</Typography>
          <Typography onClick={goToUserFavorites} variant="body2" > 
           {/* <BookmarkBorderOutlinedIcon sx={{fontSize:"15px"}} />  */}
           Favoritos </Typography>
        </Box>
      )}
    </Box>
  ) : null}
</Grid>

            <Grid item xs={1}  sx={{ml:2 }}>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleCartClick}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
                <Box sx={{ pb: 3 }}>
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
                    <Typography
                      sx={{ fontSize: 9, color: "black", fontWeight: "bold" }}
                    >
                      {cart.cart.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={1} sx={{ ml: 2 }}>
      {!user ? (
        <Box
          sx={{
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => router.push('/login')}
        >
          LogIn <LoginOutlinedIcon />
        </Box>
      ) : (
        <Box
          sx={{
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleLogout}
        >
          Logout &nbsp; <LogOutOutlinedIcon />
        </Box>
      )}
    </Grid>
          </Grid>
        </Toolbar>
      </Box>

      {/* ---------------------- COMPONENTE DE CATEGORÍAS ---------------------- */}
         <Categories />
    </AppBar>
  ) : 
  <Grid container sx={{ height: "80px", bgcolor: "white", alignItems: "center" }}>

  <Grid item xs={9}>
    <Link href={"/"}>
      <Box sx={{ display: "flex"}}>

      <Box component="img" src='/chemexvector.png' alt="logo" sx={{ width: "5%", mt: 1 }} />
      <Box component="img" src='/logo.png' alt="logo" sx={{ width: "13%", height: "45%", my:"auto"  }} />
      </Box>
    </Link>
  </Grid>

  <Grid item xs={3} sx={{ ml: "auto", p:1, bgcolor: theme.palette.primary.main , color:"black", cursor:"pointer"}}
  onClick={goToUserFavorites}>
   <Typography variant="h6">Favoritos <FavoriteBorderIcon sx={{ fontSize:"1.2rem", pt:0.5, }}/></Typography>  
  </Grid>
</Grid>


  }
    </Box>
  );
};

export default Navbar;
