import { Box, Grid, Hidden, Toolbar, Typography, Select, MenuItem, Button, Menu, ListItem, ListItemText, List  } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useSelector } from "react-redux";
import { CartState, Category, UserState } from "./types.interface";
import { useRouter } from "next/router";
import theme from "@/styles/theme";
import { getCategories } from "@/functions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type DrawerProps = {
  setOpenDrawer: any;
};

const NavListDrawer = ({ setOpenDrawer }: DrawerProps) => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const user = useSelector((state: UserState) => state.user);
  const router = useRouter()

    useEffect(() => {
      getCategories({ setCategories });
    }, []);

    const drawerlinks = [
      {title: "Home", href:"/", icon: null},
      {title: "Datos usuario", href:"/userData", icon: null},
      {title: "Favoritos", href:"/favorites", icon: null},
    ]

  const handleClick = () => {
    setOpen(!open);
  };
  
  const handleCategorySelect = (categoryId: string) => {
    router.push(`/${categoryId}`)
    setOpen(false);
    setOpenDrawer(false)
  };
  
    return (
      <Hidden mdUp>
      <Grid container spacing={2} sx={{ 
        pt: 5, 
        ml: 3, 
        display: "flex", 
        flexDirection: "column", 
        maxWidth: "250px",
        }}>
        <Toolbar sx={{ display: { xs: "flex", sm: "block" } }}>
          <Grid item>
            <Link href={"/"}>
              <Box
                component="img"
                src="/chemexvector.png"
                alt="logo"
                sx={{ width: "35%", height: "100%" }}
              />
            </Link>
          </Grid>
        </Toolbar>

        {user ?
          drawerlinks.map((item) => (
            <Grid item key={item.title}>
              <Typography
                variant="body1"
                onClick={() => {router.push(`${item.href}`), setOpenDrawer(false)}}
                sx={{ '&:hover': { color: theme.palette.primary.main, cursor: "pointer" } }}
              >
                {item.title}
              </Typography>
            </Grid>
          )) : null}

<Grid item>
    <Typography
      aria-controls="category-menu"
      aria-haspopup="true"
      onClick={handleClick}
      sx={{ 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center", 
        '&:hover': { color: theme.palette.primary.main } }}
     >
      Filtrar por categorías
      {open ? <KeyboardArrowUpIcon sx={{ marginLeft: 1 }} /> : <KeyboardArrowDownIcon sx={{ marginLeft: 1 }} />}
    </Typography>
    
        { open ?  <List component="a" >
            {categories.map((category) => (
              <ListItem sx={{maxWidth:"200px"}}
                key={category._id} 
                onClick={() => handleCategorySelect(category._id)}>
                <Box 
                sx={{'&:hover': {color: theme.palette.primary.main}, pt:1}} >{category.name} </Box>
              </ListItem>
            ))}
          </List> : null }

     </Grid>

        {!user ? (
          <Grid item>
            <Box
              sx={{
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                '&:hover': { color: "grey", cursor: "pointer" } 
              }}
            >
              <Link href="/login">
                LogIn <LoginOutlinedIcon />
              </Link>
            </Box>
          </Grid>
        ) : (
          <Grid item>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                '&:hover': { color: "grey", cursor: "pointer" } 
              }}
            >
              Logout
            </Box>
          </Grid>
        )}
      </Grid>
    </Hidden>
    );
  };

export default NavListDrawer;