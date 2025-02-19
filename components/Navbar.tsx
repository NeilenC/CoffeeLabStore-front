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
                <Toolbar
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {/* Contenedor que divide el espacio en tres partes iguales */}
                  <Grid
                    container
                    spacing={2}
                    sx={{ width: "100%" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* Logo en el margen izquierdo */}
                    <Grid
                      item
                      sx={{ justifyContent: "flex-start", width: "200px" }}
                    >
                      <LogoIcon />
                    </Grid>

                    {/* Barra de búsqueda en el centro */}
                    <Grid
                      item
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Search />
                    </Grid>

                    {/* Íconos de Usuario en el margen derecho */}
                    <Grid
                      item
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {user.name !== "" ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {/* Nombre del Usuario e Icono */}
                          <Typography
                            onClick={handleToggle}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              color: "black",
                            }}
                          >
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "regular",
                                fontSize: "14px",
                                border: "0.5px solid grey",
                              }}
                            >
                              {user?.name?.charAt(0).toUpperCase()}
                              {user?.lastName?.charAt(0).toUpperCase()}
                            </Box>
                            <KeyboardArrowDownIcon sx={{ ml: 1 }} />
                          </Typography>

                          {/* Carrito de Compras */}
                          <CartIcon
                            handleCartClick={handleCartClick}
                            cart={cart}
                          />

                          {/* Menú Expandible */}
                          {expanded && (
                            <Box
                              sx={{
                                position: "absolute",
                                zIndex: 1,
                                backgroundColor: "white",
                                color: "black",
                                width: "180px",
                                p: 2,
                                top: "40px",
                                right: 0,
                                boxShadow: 3,
                                borderRadius: 1,
                              }}
                            >
                              <Typography
                                onClick={goToUserData}
                                variant="body2"
                                sx={{
                                  cursor: "pointer",
                                  textAlign: "right",
                                  pb: 1,
                                }}
                              >
                                Tus datos
                              </Typography>
                              <Typography
                                onClick={goToUserFavorites}
                                variant="body2"
                                sx={{
                                  cursor: "pointer",
                                  textAlign: "right",
                                  pb: 1,
                                }}
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

                          {/* Cerrar Sesión */}
                          <Typography
                            onClick={handleLogout}
                            variant="body2"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            Cerrar Sesión{" "}
                            <LogoutOutlinedIcon sx={{ ml: 0.5 }} />
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            color: "white",
                            gap: 1,
                          }}
                          onClick={() => router.push("/login")}
                        >
                          Iniciar Sesión <LoginOutlinedIcon />
                        </Box>
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
