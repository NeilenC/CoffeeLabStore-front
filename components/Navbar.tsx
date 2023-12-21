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
import Image from "next/image";
import chemex from "../public/chemex.jpg";
import Categories from "./Categories";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Search from "./Search";
import theme from "../styles/theme";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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
    }, 3000);
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

  // #3E2723 marroncito oscuro
  // F5F5DC Beige
  // DAA520 amarillo tostado
  // 8B735B marron tostado claro

  return (
    <AppBar position="sticky">
      <Box sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
        <Toolbar>
          <Grid container alignItems="center" sx={{}}>
            <Grid item xs={3.5}>
              <Link href={"/"}>
                {/* <Image
            src={chemex}
            height={60}
            width={70}
            alt={'logo'}
            /> */}
              </Link>{" "}
              Logo
            </Grid>
            <Grid item xs={4}  >
              <Search />
            </Grid>
           

            <Grid item  sx={{ ml:"15%"}}>
              {user ? (
                <Box sx={{ cursor: "pointer" }}>
                  <Typography onClick={handleToggle}>
                   Hola {user?.name}!<KeyboardArrowDownIcon/>
                  </Typography>
                  <Collapse in={expanded}>
                    <Typography onClick={goToUserData}>
                      Ver tus datos
                    </Typography>
                  </Collapse>
                </Box>
              ) : null}
            </Grid>



            <Grid item xs={0.5}  sx={{ml:2}}>
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
                <Box sx={{ pb: 3.5 }}>
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

            <Grid item xs={0.7} sx={{ml:6}}>
              {!user ? (
                <Box
                  sx={{ cursor: "pointer", color: "white" }}
                  onClick={() => router.push("/login")}
                >
                  LogIn <LoginOutlinedIcon />
                </Box>
              ) : (
                <Box
                  sx={{ cursor: "pointer", color: "white" }}
                  onClick={handleLogout}
                >
                  Logout <LogOutOutlinedIcon />
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
      <Categories />
    </AppBar>
  );
};

export default Navbar;
