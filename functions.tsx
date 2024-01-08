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
export async function getProductsBySubCategory({categoryId, subCategoryId,setProducts, products}: any) {
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


  export async function getProductsByCategory({categoryId, setProducts, products}: any) {


      try {
        if (categoryId) {
          const response = await fetch(`http://localhost:8000/products/byCategory/${categoryId}`,{ method: "GET" },)
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

  // import { Category, Product, SubCategory } from "@/commons/types.interface";
  // import {
  //   Box,
  //   Grid,
  //   Card,
  //   CardContent,
  //   Typography,
  //   Button,
  //   Pagination,
  // } from "@mui/material";
  // import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
  // import Image from "next/image";
  // import Link from "next/link";
  // import { useRouter } from "next/router";
  // import React, { useEffect, useState } from "react";
  // import AddToCartButtom from "@/commons/AddToCartButtom";
  // import oslo1 from "../../public/oslo1.png";
  // import theme from "@/styles/theme";
  // import { getCategory, getProductsByCategory, getProductsBySubCategory, getSubCategory } from "@/functions";
  // import ProductsCard from "@/commons/ProductsCard";
  // import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
  // import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
  
  
  // function CategoryDetail() {
  //   const router = useRouter();
  //   const { categoryId, subCategoryId } = router.query;
  //   const [products, setProducts] = useState<Product[]>([]);
  //   const [category, setCategory] = useState("");
  //   const [subCategory, setSubcategory] = useState<SubCategory[]>([]);
  //   const [selectedSubCategory, setSelectedSubCategory] = useState("");
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const productsPerPage = 9;
  //   const totalPages = Math.ceil(products.length / productsPerPage);
  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  //   useEffect(() => {
  //     getSubCategory({ categoryId, setSubcategory, subCategory });
  //   }, [categoryId]);
  
  //   useEffect(() => {
  //     getProductsBySubCategory({ categoryId, subCategoryId, setProducts, products });
  //   }, [categoryId, subCategoryId]);
    
  //   useEffect(() => {
  //     getProductsByCategory({ categoryId, setProducts, products})
  //   },[categoryId])
  
  //   useEffect(() => {
  //     if(subCategoryId === null ){
  //       getCategory({ categoryId, setCategory, category });
  //     }
  //   }, [categoryId]);
  
  //   const handlePageChange = (newPage: number) => {
  //     setCurrentPage(newPage);
  //   };
  
  //   return (
  //     <Box sx={{ display: "flex", px: 4, py: 2 , bgcolor:"white"}}>
  //       <Box sx={{ width: "20%" }}>
  //         <Typography
  //           variant="h5"
  //           sx={{ justifyContent: "center", p: 4, fontWeight: "bold" }}
  //         >
  //           {category}
  //         </Typography>
  //         <Grid container spacing={2} sx={{ ml: 2 }}>
  //           {subCategory.map((subcategory) => (
  //             <Grid
  //               item
  //               xs={12}
  //               key={subcategory._id}
  //               sx={{
  //                 "&:hover": {
  //                   color: theme.palette.text.secondary,
  //                   cursor: "pointer",
  //                 },
  //                 color:
  //                   selectedSubCategory === subcategory.name
  //                     ? "#DAA520"
  //                     : "inherit",
  //               }}
  //               onClick={() => {
  //                 router.push(`/${categoryId}/${subcategory._id}`),
  //                   setSelectedSubCategory(subcategory.name);
  //               }}
  //             >
                       
  //                <Typography sx={{ fontWeight: "bold" }}>
  //                 {/* {selec} */}
  //               </Typography>
  //               <Typography sx={{ fontWeight: "bold" }}>
  //                 {subcategory.name}
  //               </Typography>
  //             </Grid>
  //           ))}
  //         </Grid>
  //       </Box>
  //       <Grid container spacing={3} sx={{ display: "flex", pt: 3, m: "auto" }}>
  //         <Box sx={{}}>
  //           {selectedSubCategory === "Oslo" ? (
  //             <Image alt="imageOslo" src={oslo1} height={100} width={1000} />
  //             // <Box component={'img'} src={'/oslo1.png'}  alt="imageOslo" sx={{height:"200px", width: "95%"}} />
  
  //           ) : null}
  //         </Box>
  //         {/* MAP DE LOS PRODUCTOS */}
          
  //         {products.length ? (
  //           <Box>
  
  //           <Box sx={{m:"auto", bgcolor:"whitesmoke"}}>
  //           <ProductsCard products={currentProducts} />
  //           {/* PAGINACION */}
  //         </Box>
  //           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
  //             <Button
  //               disabled={currentPage === 1}
  //               onClick={() => handlePageChange(currentPage - 1)}
  //             >
  //               <KeyboardDoubleArrowLeftIcon />
  //             </Button>
  //             {Array.from({ length: totalPages }).map((_, index) => (
  //               <Button
  //                 key={index}
  //                 onClick={() => handlePageChange(index + 1)}
  //                 sx={{
  //                   fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
  //                 }}
  //               >
  //                 {index + 1}
  //               </Button>
  //             ))}
  //             <Button
  //               disabled={indexOfLastProduct >= products.length}
  //               onClick={() => handlePageChange(currentPage + 1)}
  //             >
  //               <KeyboardDoubleArrowRightIcon />
  //             </Button>
  //           </Box>
  //         </Box>
          
          
  //         ) : (
  //           <Grid
  //             container
  //             key="no-products-message"
  //             sx={{ width: "50%", m: "auto" }}
  //           >
  //             <Grid item xs={5} sm={5}>
  //               <Typography variant="h6"> Lo sentimos!</Typography>
  //               <Typography variant="body1">
  //                 No hay productos para esta categoría.{" "}
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         )}
  //       </Grid>
  //     </Box>
  //   );
  // }
  
  // export default CategoryDetail;
  