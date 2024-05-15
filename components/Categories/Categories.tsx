import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Category } from "@/commons/types.interface";
import useCategories from "./hooks/useCategories";

const Categories = () => {
  const {
    handleSubcategoryChange,
    handleMouseLeaveSubcategory,
    handleMouseEnterSubcategory,
    subCategory,
    expandedCategory,
    subcategoryRef,
    handleMouseEnterCategory,
    handleMouseLeaveCategory,
    categories,
    selectedCategory,
  } = useCategories();

  return (
    <Grid container sx={{ bgcolor: "white", height: 50 }}>
      {categories.map((category: Category) => {
        const isExpanded = category._id === expandedCategory;
        return (
          <Grid
            item
            key={category._id}
            xs={2}
            md={1}
            sx={{ mx: "auto" }}
            onMouseEnter={() => handleMouseEnterCategory(category._id)}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <Typography
              onClick={() => {
                handleSubcategoryChange(category._id, null);
              }}
              variant="h6"
              sx={{
                color:
                  category._id === selectedCategory && isExpanded
                    ? "grey"
                    : "black",
                cursor: "pointer",
                p: 1,
                fontWeight: "bold",
              }}
            >
              {category.name}
            </Typography>
            {isExpanded ? (
              <Box
                ref={subcategoryRef}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  bgcolor: "white",
                  py: 1,
                  p: 1.5,
                  columns: subCategory.length > 4 ? "2" : "1",
                  width: "250px",
                  columnGap: "30px",
                }}
                onMouseEnter={handleMouseEnterSubcategory}
                onMouseLeave={handleMouseLeaveSubcategory}
              >
                {subCategory.map((subcategory: any) => (
                  <Box key={subcategory._id} sx={{ py: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        paddingLeft: 1,
                        textAlign: "left",
                        "&:hover": { color: "grey" },
                      }}
                      onClick={() =>
                        handleSubcategoryChange(category._id, subcategory._id)
                      }
                    >
                      {subcategory.name}
                    </Typography>
                    {/* <Divider sx={{width:"80%", ml:1}}/> */}
                  </Box>
                ))}
              </Box>
            ) : null}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Categories;
