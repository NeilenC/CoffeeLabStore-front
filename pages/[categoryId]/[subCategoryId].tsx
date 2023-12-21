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
import { useEffect, useState } from "react";
import AddToCartButtom from "@/commons/AddToCartButtom";
import oslo1 from "../../public/oslo1.png";
import theme from "@/styles/theme";
import { getCategory, getProductsByCategory, getSubCategory } from "@/Hooks/functions";
import ProductsCard from "@/commons/ProductsCard";

function CategoryDetail() {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  useEffect(() => {
    getSubCategory({categoryId, setSubcategory, subCategory})
  }, [categoryId]);

  useEffect(() => {
    getProductsByCategory({categoryId, subCategoryId, setProducts , products})
  }, [products]);

  useEffect(() => {
    getCategory({categoryId, setCategory, category});
  }, [categoryId]);

  return (
    <Box sx={{ display: "flex", px: 4, py: 2, height: "100%" }}>
      <Box sx={{ width: "20%" }}>
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
                {" "}
                {subcategory.name}{" "}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Grid container spacing={3} sx={{ display: "flex", pt: 3, m: "auto" }}>
        <Box sx={{}}>
          {selectedSubCategory == "Oslo" ? (
            <Image alt="imageOslo" src={oslo1} height={100} width={1000} />
          ) : null}
        </Box>
{/* // MAP DE LOS PRODUCTOS  */}
        {products.length ? (
          <ProductsCard  products={currentProducts}/>
        ) : (
          <Grid
            container
            key="no-products-message"
            sx={{ width: "50%", m: "auto" }}
          >
            <Grid item xs={5} sm={5} spacing={3}>
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
