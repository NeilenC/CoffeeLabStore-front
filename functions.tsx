import { Category, Product, SubCategory } from "@/commons/types.interface";


//OBTENER TODOS LOS PRODUCTOS 

export const getProducts = async({setProducts, products}:any) => {
    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      
      setProducts(data);
      return products;
    } catch (error) {
        console.error("Error:", error);
    }
  }


// CATEGORIAS
export async function getProductsByCategory({categoryId, subCategoryId,setProducts, products}: any) {
    try {
      if (categoryId) {
        const response = await fetch(
          `http://localhost:8000/products/bySubCategory/${subCategoryId}`,
          { method: "GET" },
        );
        const dataPromise: Promise<Product[]> = response.json();

        const data = await dataPromise;

        if (data) {
          setProducts(data);
          return products
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  }

export const getSubCategory = async ({categoryId, setSubcategory, subCategory}: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/subcategory/${categoryId}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setSubcategory(data);

        return subCategory;
      }
    } catch (e) {
      throw new Error();
    }
  };

  export const getCategory = async ({categoryId, setCategory, category}: any) => {
    const categories = await fetch(
      `http://localhost:8000/categories/${categoryId}`,
      { method: "GET" },
    );

    const data = await categories.json();
    setCategory(data.name);
    return category;
  }

  //------------------------ FUNCION OBTENER CATEGORIAS ------------------------

  export const getCategories = async ({setCategories}: any) => {
    const response = await fetch("http://localhost:8000/categories", {
      method: "GET",
    });
    const dataPromise: Promise<Category[]> = response.json();

    const data = await dataPromise;

    setCategories(data);
  }

  //------------------------ FUNCION OBTENER SUBCATEGORIAS ------------------------
 export const getSubCategories = async ({selectedCategory, setSubcategory}: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/subcategory/${selectedCategory}`,
        {
          method: "GET",
        },
      );
      const dataPromise: Promise<SubCategory[]> = response.json();
      const data = await dataPromise;

      if (response.ok) {
        setSubcategory(data);
      }
    } catch (e) {
      throw new Error();
    }
  };
  // ------------------------ FUNCION PARA BUSCADOR ------------------------

 export const searchProducts = async ({searchTerm,setSearchResults}: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/search/${searchTerm}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };


  // import {
  //   AppBar,
  //   Grid,
  //   IconButton,
  //   InputBase,
  //   Toolbar,
  //   Typography,
  //   Box,
  //   Collapse,
  // } from "@mui/material";
  // import SearchIcon from "@mui/icons-material/Search";
  // import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
  // import LogOutOutlinedIcon from "@mui/icons-material/LogOutOutlined";
  // import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
  // import React, { useEffect, useState } from "react";
  // import Link from "next/link";
  // import { useDispatch, useSelector } from "react-redux";
  // import { CartState, UserState } from "@/commons/types.interface";
  // import useUserData from "@/Hooks/useUserData";
  // import { clearUserInfo } from "@/redux/userInfo";
  // import { useRouter } from "next/router";
  // import Categories from "./Categories";
  // import Search from "./Search";
  // import theme from "../styles/theme";
  // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  // // import chemexVector from '../public/chemexVector.jpg'
  
  
  // const Navbar = () => {
  //   const cart = useSelector((state: CartState) => state.cart);
  //   useUserData();
  //   const user = useSelector((state: UserState) => state.user);
  //   const dispatch = useDispatch();
  //   const router = useRouter();
  //   const [expanded, setExpanded] = useState(false);
  
  //   const handleToggle = () => {
  //     setExpanded(!expanded);
  //     setTimeout(() => {
  //       setExpanded(false);
  //     }, 3000);
  //   };
  
  //   const handleCartClick = () => {
  //     router.push("/cart");
  //   };
  
  //   const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     dispatch(clearUserInfo());
  //     router.push("/login");
  //   };
  
  //   const goToUserData = () => {
  //     router.push("/userData");
  //   };
  
  //   // #3E2723 marroncito oscuro
  //   // F5F5DC Beige
  //   // DAA520 amarillo tostado
  //   // 8B735B marron tostado claro
  
  //   useEffect(() => {
  //     if (router.pathname === '/cart') {
  //       setExpanded(false);
  //     }
  //   }, [router.pathname]);
  
  //   return (
  //     <Box>
  //  { router.pathname !== '/cart' ? (
  //     <AppBar position="sticky">
  //       <Box sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
  //         <Toolbar>
  //           <Grid container alignItems="center" sx={{}}>
  //             <Box  sx={{ maxWidth:"30%"}} >
  //               <Link href={"/"}>
  //               <Box sx={{display:"flex"}}>
  //                 <Box component="img"  src='/chemexvector.png' alt="logo" sx={{width:"13%", height:"10%"}} />
  //                 <Box component="img"  src='/logo.png' alt="logo" sx={{width:"30%", height:"10%", my:"auto"}} />
  //               </Box>
  //               </Link>
  //             </Box>
  //             <Grid item xs={4}  >
  //               <Search />
  //             </Grid>
             
  
  //             <Grid item  sx={{ ml:"15%"}}>
  //               {user ? (
  //                 <Box sx={{ cursor: "pointer" }}>
  //                   <Typography onClick={handleToggle}>
  //                    Hola {user?.name}!<KeyboardArrowDownIcon/>
  //                   </Typography>
  //                   <Collapse in={expanded}>
  //                     <Typography onClick={goToUserData}>
  //                       Ver tus datos
  //                     </Typography>
  //                   </Collapse>
  //                 </Box>
  //               ) : null}
  //             </Grid>
  
  
  
  //             <Grid item xs={0.5}  sx={{ml:2}}>
  //               <Box
  //                 sx={{
  //                   cursor: "pointer",
  //                   display: "flex",
  //                   alignItems: "center",
  //                   justifyContent: "center",
  //                 }}
  //                 onClick={handleCartClick}
  //               >
  //                 <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
  //                 <Box sx={{ pb: 3.5 }}>
  //                   <Box
  //                     sx={{
  //                       width: 17,
  //                       height: 17,
  //                       p: 0.5,
  //                       bgcolor: "white",
  //                       borderRadius: "50%",
  //                       display: "flex",
  //                       alignItems: "center",
  //                       justifyContent: "center",
  //                     }}
  //                   >
  //                     <Typography
  //                       sx={{ fontSize: 9, color: "black", fontWeight: "bold" }}
  //                     >
  //                       {cart.cart.length}
  //                     </Typography>
  //                   </Box>
  //                 </Box>
  //               </Box>
  //             </Grid>
  
  //             <Grid item xs={0.7} sx={{ml:6}}>
  //               {!user ? (
  //                 <Box
  //                   sx={{ cursor: "pointer", color: "white" }}
  //                   onClick={() => router.push("/login")}
  //                 >
  //                   LogIn <LoginOutlinedIcon />
  //                 </Box>
  //               ) : (
  //                 <Box
  //                   sx={{ cursor: "pointer", color: "white" }}
  //                   onClick={handleLogout}
  //                 >
  //                   Logout <LogOutOutlinedIcon />
  //                 </Box>
  //               )}
  //             </Grid>
  //           </Grid>
  //         </Toolbar>
  //       </Box>
  //       <Categories />
  //     </AppBar>
  //   ) : 
  //   <Box sx={{height:"80px", bgcolor:"white"}}>
  
  //     <Link href={"/"}>
  //     <Box sx={{display:"flex", ml:2}}>
  
  //       <Box component="img"  src='/chemexvector.png' alt="logo" sx={{width:"4%", my:"auto", mt:1}} />
  //       <Box component="img"  src='/logo.png' alt="logo" sx={{width:"10%", height:"9%", mt:3}} />
  //     </Box>
  //     </Link>
  //   </Box> 
  //   }
  //     </Box>
  //   );
  // };
  
  // export default Navbar;
  