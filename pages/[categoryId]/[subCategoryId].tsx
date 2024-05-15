import {
  Box,
  Grid,
  Button,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { useRouter } from "next/router";
import React, {useState } from "react";
import ProductsCard from "@/commons/ProductsCard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import NotFound from "@/commons/NotFound";
import SideBarCategories from "@/commons/SideBarCategories";
import DrawerListCategories from "@/commons/DrawerListCategories";
import useCategoriesDetails from "@/Hooks/useCategoriesDetails";

function CategoryDetail() {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const { currentPage, products, category, subCategory, handlePageChange } = useCategoriesDetails(
    { categoryId, subCategoryId }
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 1000px)");
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <Box
      sx={{
        pt: isMediumScreen && !isSmallScreen ? 10 : 1,
        display: "flex",
        height: "100vh",
        maxWidth: "100%",
        bgcolor: isSmallScreen || isMediumScreen ? "whitesmoke" : "white",
        flexDirection: isSmallScreen || isMediumScreen ? "column" : null,
      }}
    >
      {isSmallScreen || isMediumScreen ? (
        <Box sx={{ display: "flex", height: "20%" }}>
          <Box sx={{ direction: "column", width: "100%", bgcolor: "white" }}>
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

      <Grid container sx={{ pt: 3, justifyContent: "center", width: "100%" }}>
        {products.length ? (
          <Box sx={{ pb: 3, width: "90%" }}>
            <Box sx={{ bgcolor: "whitesmoke" }}>
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
          <NotFound> No hay productos para esta categoría. </NotFound>
        )}
      </Grid>
    </Box>
  );
}

export default CategoryDetail;
