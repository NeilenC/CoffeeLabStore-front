import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import { clearUserInfo } from "@/redux/UserReducer";
import { useRouter } from "next/router";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import Categories from "./Categories";
import theme from "../styles/theme";
import Search from "./Search";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogOutOutlinedIcon from "@mui/icons-material/LogOutOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavListDrawer from "@/commons/NavListDrawer";
import MenuIcon from '@mui/icons-material/Menu';
import CartIcon from "./CartIcon";
import LogoIcon from "@/commons/LogoIcon";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const cart = useSelector((state: CartState) => state.cart);
  const user = useSelector((state: UserState) => state.user);
  const isSmallScreen = useMediaQuery('(max-width: 400px)')
  const isMediumScreen = useMediaQuery('(max-width: 900px)')
  const [openDrawer,setOpenDrawer] = useState(false)
  const path = router.pathname


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

  const goToHistory = () => {
    router.push('/order/history')
  }

  useEffect(() => {
    if (router.pathname === "/cart") {
      setExpanded(false);
    }
  }, [router.pathname]);

  return (
    <>
    { router.pathname !== "/login" && user._id !== '' ? 
    <Box position="sticky" zIndex={1} 
    sx={{pb: path != '/cart' && isSmallScreen || isMediumScreen ? "10px" : "100px"}}>
      {isSmallScreen || isMediumScreen ? (
          <Grid container sx={{display:"flex", }}>
              
            <Grid item xs={10}>

             <MenuIcon
             sx={{m:2}}
             onClick={()=> setOpenDrawer(true)}/>
              <Drawer 
              open ={openDrawer}
              anchor="left"
              onClose={()=> setOpenDrawer(false)}
              >
             <NavListDrawer setOpenDrawer={setOpenDrawer} />
              </Drawer>
                </Grid>
                {path  !== '/cart' ? 
                
                <Grid item xs={2} sx={{m:"auto"}}>

                 <CartIcon handleCartClick={handleCartClick} cart={cart}/>
                </Grid>
              :null}
              </Grid>
       ) : null }
       
       {router.pathname !== "/cart"   && (
        <AppBar  sx={{display:{xs:"none", sm: "block"}}}>
          <Box sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
            <Toolbar>

              <Grid container alignItems="center" >
               <LogoIcon/>
                <Grid item xs={1} md={3} sm={1}>
                  <Search />
                </Grid>

                <Grid item sx={{ ml: "15%", position: "relative" }} xs={1} md={1.5} sm={2}>
                  {user._id !== '' ? (
                    <Box
                      sx={{
                        cursor: "pointer",
                        padding: "10px",
                        margin: "10px",
                      }}
                      >
                      <Typography
                        onClick={handleToggle}
                        sx={{ display: "flex", alignItems: "center",  ml:1}}
                        >
                        Hola {user.name}!
                        <KeyboardArrowDownIcon />
                      </Typography>
                      {expanded && (
                        <Box
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          backgroundColor: "white",
                          color: "white",
                          width: isMediumScreen ? "100%" : "80%",
                          p: 2,
                          pb: 1,
                          bgcolor: theme.palette.primary.main,
                        }}
                        >
                          <Typography
                            onClick={goToUserData}
                            variant="body2"
                            sx={{ pb: 1 }}
                            >
                            Tus datos
                          </Typography>
                          <Typography
                            onClick={goToUserFavorites}
                            variant="body2"
                            sx={{ pb: 1 }}
                            >
                            Favoritos{" "}
                          </Typography>
                          <Typography
                            onClick={goToHistory}
                            variant="body2"
                            >
                            Tus compras{" "}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ) : null}
                  </Grid>


                    <Grid item xs={2} md={1}>
                      <CartIcon handleCartClick={handleCartClick} cart={cart}/>
                    </Grid>
              
                <Grid item xs={1} md={1} sm={1} sx={{ml:2}}
                      onClick={handleLogout}
                      >
                  {user._id == '' ? (
                    <Box
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => router.push("/login")}
                    >
                      LogIn &nbsp;  <LoginOutlinedIcon />
                    </Box>
                    ) : (
                    <Box
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                    {isMediumScreen ? 
                     <LogOutOutlinedIcon /> : <> Logout &nbsp; <LogOutOutlinedIcon /> </> }  
                    </Box>
                  )}
                </Grid>
                </Grid>
            </Toolbar>

          </Box>

          {/* ---------------------- COMPONENTE DE CATEGORÍAS ---------------------- */}
          <Categories />
          
        </AppBar>
      ) }
       {/*  EN CARRITO SI SE ENCUENTRA EN PANTALLA PEQUEÑA O MEDIANA NO SE MUESTRA */}
      {router.pathname === "/cart" && !isMediumScreen && (
          <Grid
          container
          sx={{ height: "80px", bgcolor: "white", alignItems: "center" ,ml:1}}
          >
          <LogoIcon/>
          <Grid
            item
            xs={3}
            sx={{
              ml: "auto",
              p: 1,
              bgcolor: theme.palette.primary.main,
              color: "black",
              cursor: "pointer",
            }}
            onClick={goToUserFavorites}
          >
            <Typography variant="h6">
              Favoritos{" "}
              <FavoriteBorderIcon sx={{ fontSize: "1.2rem", pt: 0.5 }} />
            </Typography>
          </Grid>
          </Grid>
          )
      }


    </Box> 
     : <Box sx={{heigth:10, p:2, pb:1}}>
        <LogoIcon/>
      </Box>
      }
    </>

  );
};

export default Navbar;
