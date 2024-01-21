import { Category, Product, SubCategory } from "@/commons/types.interface";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
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
} from "@/functions";
import ProductsCard from "@/commons/ProductsCard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function CategoryDetail() {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  console.log("routerquery", router.query)
  useEffect(() => {
    getSubCategory({ categoryId, setSubcategory, subCategory });
  }, [categoryId]);



  useEffect(() => {
      getProductsByCategory({
        categoryId,
        setProducts,
        products 
      });

  }, [categoryId, subCategoryId, category]);

  useEffect(() => {
    getCategory({ categoryId, setCategory, category });
  }, [categoryId]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  console.log("products", products);

  return (
    <Box sx={{ display: "flex", bgcolor: "white" }}>
      <Box sx={{ width: "15%" }}>
        <Typography
          variant="h5"
          sx={{ justifyContent: "center", p: 4, fontWeight: "bold" }}
        >
          {category}
        </Typography>
        <Grid container spacing={2} sx={{ ml: 2 }}>
          {subCategory.map((subcategory) => (
            <Grid
              item
              xs={12}
              key={subcategory._id}
              sx={{
                "&:hover": {
                  color: theme.palette.text.secondary,
                  cursor: "pointer",
                },
                color:
                  selectedSubCategory === subcategory.name
                    ? "#DAA520"
                    : "inherit",
              }}
              onClick={() => {
                router.push(`/${categoryId}/${subcategory._id}`),
                  setSelectedSubCategory(subcategory.name);
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {subcategory.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Grid container spacing={3} sx={{ display: "flex", pt: 3, m: "auto" }}>
        <Box sx={{}}>
          {selectedSubCategory === "Oslo" ? (
            <Box>
              <Image alt="imageOslo" src={oslo1} height={150} width={1300} />
            </Box>
          ) : // <Box component={'img'} src={'/oslo1.png'}  alt="imageOslo" sx={{height:"200px", width: "95%"}} />

          null}
        </Box>
        {/* MAP DE LOS PRODUCTOS */}

        {products.length ? (
          <Box sx={{ mr: 1 }}>
            <Box sx={{ m: "auto", bgcolor: "whitesmoke" }}>
              <ProductsCard products={currentProducts} />
              {/* PAGINACION */}
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
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
          <Grid
            container
            key="no-products-message"
            sx={{ width: "50%", m: "auto" }}
          >
            <Grid item xs={5} sm={5}>
              <Typography variant="h6"> Lo sentimos!</Typography>
              <Typography variant="body1">
                No hay productos para esta categoría.{" "}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default CategoryDetail;
