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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavListDrawer from "@/commons/NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "./CartIcon";
import LogoIcon from "@/commons/LogoIcon";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const cart = useSelector((state: CartState) => state.cart);
  const user = useSelector((state: UserState) => state.user);
  const isSmallScreen = useMediaQuery("(max-width: 400px)");
  const isMediumScreen = useMediaQuery("(max-width: 900px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const path = router.pathname;

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
    router.push("/order/history");
  };

  useEffect(() => {
    if (router.pathname === "/cart") {
      setExpanded(false);
    }
  }, [router.pathname]);

  return (
    <>
      {router.pathname !== "/login" &&
      router.pathname !== "/register" &&
      user._id !== "" ? (
        <Box
          position="sticky"
          zIndex={1}
          sx={{
            pb:
              (path != "/cart" && isSmallScreen) || isMediumScreen
                ? "10px"
                : "100px",
          }}
        >
          {isSmallScreen || isMediumScreen ? (
            <Grid container sx={{ display: "flex" }}>
              <Grid item xs={10}>
                <MenuIcon sx={{ m: 2 }} onClick={() => setOpenDrawer(true)} />
                <Drawer
                  open={openDrawer}
                  anchor="left"
                  onClose={() => setOpenDrawer(false)}
                >
                  <NavListDrawer setOpenDrawer={setOpenDrawer} />
                </Drawer>
              </Grid>
              {path !== "/cart" ? (
                <Grid item xs={2} sx={{ m: "auto" }}>
                  <CartIcon handleCartClick={handleCartClick} cart={cart} />
                </Grid>
              ) : null}
            </Grid>
          ) : null}

          {router.pathname !== "/cart" && (
            <AppBar sx={{ display: { xs: "none", sm: "block" } }}>
              <Box sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
                <Toolbar>
                  <Grid
                    container
                    alignItems="center"
                    sx={{  }}
                  >
                    <LogoIcon />

                    <Grid item  sx={{ mr: "15%" }}>
                      <Search />
                    </Grid>

                    <Grid
                      item
                      sx={{ position: "relative" }}
                      xs={1}
                      md={1.5}
                      sm={1}
                    >
                    {user._id !== "" ? (
  <Box
    sx={{
      width:'230px',
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between", 
      alignItems: "center", 
    }}
  >
   <Typography
  onClick={handleToggle}
  sx={{
    display: "flex",
    alignItems: "center", // Asegura que los elementos estén centrados verticalmente
    color:'black'
  }}
>
  <Box
    sx={{
      width: 30, // Ajusta el tamaño del círculo
      height: 30, // Ajusta el tamaño del círculo
      borderRadius: "50%", // Hace que el Box tenga forma circular
      backgroundColor: "white", // Fondo blanco
      display: "flex", 
      justifyContent: "center", // Centra horizontalmente las iniciales
      alignItems: "center", // Centra verticalmente las iniciales
      fontWeight: "regular", // Puedes ajustar el grosor de la letra si lo deseas
      fontSize: "14px", // Ajusta el tamaño de la fuente
      marginRight: 1, // Espaciado entre el círculo y el siguiente ícono
      border: "0.5px solid grey", // Agrega un borde negro si lo deseas
    }}
  >
    {user?.name?.charAt(0).toUpperCase()}{user?.lastName?.charAt(0).toUpperCase()}
  </Box>
  <KeyboardArrowDownIcon sx={{ }} />
</Typography>


    <Grid item xs={2} md={1}>
      <CartIcon
        handleCartClick={handleCartClick}
        cart={cart}
      />
    </Grid>

    {expanded && (
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "white",
          color:'black',
          width: isMediumScreen ? "100%" : "80%",
          p: 2,
          pb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          transform: "translateX(-50%)",
          top:'40px'
        }}
      >
        <Typography
          onClick={goToUserData}
          variant="body2"
          sx={{ pb: 1, cursor: "pointer", textAlign: "right" }}
        >
          Tus datos
        </Typography>
        <Typography
          onClick={goToUserFavorites}
          variant="body2"
          sx={{ pb: 1, cursor: "pointer", textAlign: "right" }}
        >
          Favoritos
        </Typography>
        <Typography
          onClick={goToHistory}
          variant="body2"
          sx={{ cursor: "pointer", textAlign: "right" }}
        >
          Tus compras
        </Typography>
      </Box>
    )}

    <Typography
      onClick={handleLogout}
      variant="body2"
      sx={{
        display: "flex",
        cursor: "pointer",
        ml: 2, // Espacio entre el icono y el texto
        pt:0.5
      }}
    >
      Logout <LogoutOutlinedIcon sx={{ ml: 1 }} />
    </Typography>
  </Box>
): (
                        <Grid item sx={{ ml: "auto" }}>
                          <Box
                            sx={{
                              cursor: "pointer",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={() => router.push("/login")}
                          >
                            LogIn &nbsp; <LoginOutlinedIcon />
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Toolbar>
              </Box>

              {/* ---------------------- COMPONENTE DE CATEGORÍAS ---------------------- */}
              <Categories />
            </AppBar>
          )}
          {/*  EN CARRITO SI SE ENCUENTRA EN PANTALLA PEQUEÑA O MEDIANA NO SE MUESTRA */}
          {router.pathname === "/cart" && !isMediumScreen && (
            <Grid
              container
              sx={{
                height: "80px",
                bgcolor: "white",
                alignItems: "center",
                ml: 1,
              }}
            >
              <LogoIcon />
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
      ) : (
        <Box sx={{ p: 1, bgcolor: "rgba(212, 197, 144, 0.9)" }}>
          <LogoIcon />
        </Box>
      )}
      {/* bgcolor: "rgba(212, 197, 144, 0.69)", */}
    </>
  );
};

export default Navbar;
