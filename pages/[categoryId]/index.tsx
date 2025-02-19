import { Category, Product, SubCategory } from "@/commons/types.interface";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddToCartButtom from "@/commons/AddToCartButton";
import oslo1 from "../../public/oslo1.png";
import theme from "@/styles/theme";
import {
  getCategory,
  getProductsByCategory,
  getProductsBySubCategory,
  getSubCategory,
} from "@/functionsFetch";
import ProductsCard from "@/commons/ProductsCard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DrawerListCategories from "@/commons/DrawerListCategories";
import SideBarCategories from "@/commons/SideBarCategories";

function CategoryDetail() {
  const router = useRouter();
  const categoryId = router.query.categoryId;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 1000px)");
  useEffect(() => {

    getSubCategory({ categoryId, setSubcategory, subCategory })
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory({
      categoryId,
      setProducts,
      products,
    }).finally(() => setLoading(false));
  }, [categoryId, category]);

  useEffect(() => {
    getCategory({ categoryId, setCategory, category });
  }, [categoryId]);

  const handleSelectSubcategory = (subcategoryId: string) => {
    setSelectedSubCategory(subcategoryId);
    router.push(`/${categoryId}/${subcategoryId}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        maxWidth: "100%",
        flexDirection: isSmallScreen || isMediumScreen ? "column" : null,
        mt: isMediumScreen && !isSmallScreen ? 10 : 2,
      }}
    >
      {isSmallScreen || isMediumScreen ? (
        <Box sx={{ display: "flex", height: "20%" }}>
          <Box sx={{ direction: "column", bgcolor: "white", width: "100%" }}>
            <DrawerListCategories
              category={category}
              subCategory={subCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              categoryId={categoryId}
            />
          </Box>
        </Box>
      ) : (
        <SideBarCategories
          category={category}
          subCategory={subCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          categoryId={categoryId}
        />
      )}

      <Grid container spacing={3} sx={{ display: "flex", m:'auto',  justifyContent:'center', width:'100%',}}>
        <Box sx={{}}>
          {selectedSubCategory === "Oslo" ? (
            <Box>
              <Image alt="imageOslo" src={oslo1} height={150} width={1300} />
            </Box>
          ) : // <Box component={'img'} src={'/oslo1.png'}  alt="imageOslo" sx={{height:"200px", width: "95%"}} />

          null}
        </Box>
        {/* MAP DE LOS PRODUCTOS */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <Box sx={{ mr: 1 , width:'100%' }}>
            <Box sx={{ m: "auto", bgcolor: "whitesmoke" }}>
              <ProductsCard products={currentProducts} />
            </Box>

            {/* Paginación */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center"}}>
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <KeyboardDoubleArrowLeftIcon />
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  sx={{
                    fontWeight: currentPage === index + 1 ? "bold" : "normal",
                  }}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                disabled={indexOfLastProduct >= products.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <KeyboardDoubleArrowRightIcon />
              </Button>
            </Box>
          </Box>
        ) : (
          // Mostrar mensaje solo si no hay productos y no está cargando
          <Grid
            container
            key="no-products-message"
            sx={{ width: "50%", m: "auto" }}
          >
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h6">¡Lo sentimos!</Typography>
              <Typography variant="body1">
                No hay productos para esta categoría.
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default CategoryDetail;
