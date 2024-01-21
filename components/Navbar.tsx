import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import { clearUserInfo } from "@/redux/userInfo";
import { useRouter } from "next/router";
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Box,
  Collapse,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import Link from "next/link";
import useUserData from "@/Hooks/useUserData";
import Categories from "./Categories";
import theme from "../styles/theme";
import Search from "./Search";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogOutOutlinedIcon from "@mui/icons-material/LogOutOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavListDrawer from "@/commons/NavListDrawer";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  useUserData();
  const dispatch = useDispatch();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const cart = useSelector((state: CartState) => state.cart);
  const user = useSelector((state: UserState) => state.user);
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const isMediumScreen = useMediaQuery('(max-width: 1000px)')
  const [openDrawer,setOpenDrawer] = useState(false)

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

  useEffect(() => {
    if (router.pathname === "/cart") {
      setExpanded(false);
    }
  }, [router.pathname]);
  console.log("username", user.name)
  return (
    <Box sx={{}}>
      {isSmallScreen ? (
          <>
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
              </>
       ) : null }
       
      {router.pathname !== "/cart" ? (
        <AppBar position="sticky" sx={{display:{xs:"none", sm: "block"}}}>
          <Box sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
            <Toolbar>

              <Grid container alignItems="center" >
                <Box sx={{ maxWidth: "28%" }}>
                  <Link href={"/"}>
                    <Grid item sx={{ display: "flex", }} xs={2} md={12} sm={12} >
                      <Box
                        component="img"
                        src="/chemexvector.png"
                        alt="logo"
                        sx={{ width:  isSmallScreen ? "50px" : "50px", height: "10%" }}
                 
                      />
                      <Box
                        component="img"
                        src="/logo.png"
                        alt="logo"
                        sx={{
                         width:  isSmallScreen || isMediumScreen  ? "100px" : "30%",
                         height:  isSmallScreen || isMediumScreen ? "25px" : "30%",
                         my: "auto"
                         }}

                        />
                    </Grid>
                  </Link>
                </Box>
                <Grid item xs={1} md={3} sm={1}>
                  <Search />
                </Grid>

                <Grid item sx={{ ml: "15%", position: "relative" }} xs={1} md={1.5} sm={2}>
                  {user ? (
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
                            >
                            {/* <BookmarkBorderOutlinedIcon sx={{fontSize:"15px"}} />  */}
                            Favoritos{" "}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ) : null}
                  </Grid>

                <Grid item xs={2} md={1} >
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
                          sx={{
                            fontSize: 9,
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {cart.cart.length}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={1} md={1} sm={1} sx={{ml:2}}>
                  {!user ? (
                    <Box
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => router.push("/login")}
                    >
                      LogIn <LoginOutlinedIcon />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleLogout}
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
      ) : (
        <Grid
          container
          sx={{ height: "80px", bgcolor: "white", alignItems: "center" }}
        >
          <Grid item xs={9}>
            <Link href={"/"}>
              <Box sx={{ display: "flex" }}>
                <Box
                  component="img"
                  src="/chemexvector.png"
                  alt="logo"
                  sx={{     
                  width: isSmallScreen ? "50px" : "50px",
                  mt: 1 }}
                />
                <Box
                  component="img"
                  src="/logo.png"
                  alt="logo"
                  sx={{     
                   width:  isSmallScreen || isMediumScreen  ? "25%" : "10%",
                  height:  isSmallScreen || isMediumScreen ? "20%" : "30%", 
                  my: "auto" }}
                />
              </Box>
            </Link>
          </Grid>

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
      )}
    </Box>
  );
};

export default Navbar;
