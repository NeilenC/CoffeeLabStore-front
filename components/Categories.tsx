import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Category } from "@/commons/types.interface";
import { useRouter } from "next/router";
import { getCategories } from "@/functions";

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subCategory, setSubcategory] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState("");
  const subcategoryRef = useRef<HTMLDivElement | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isMouseOverCategory, setIsMouseOverCategory] = useState(false);
  const [isMouseOverSubcategory, setIsMouseOverSubcategory] = useState(false);
  const [isClosingCategory, setIsClosingCategory] = useState(false);

  useEffect(() => {
    getCategories({setCategories});
  }, []);


  const handleMouseEnterCategory = useCallback((categoryId: string) => {
    getSubCategory(categoryId);
    setSelectedCategory(categoryId);
    setIsMouseOverCategory(true);
    setIsClosingCategory(false); 
  }, []);

  const handleMouseLeaveCategory = useCallback(() => {
    if (!isMouseOverSubcategory) {
      setIsMouseOverCategory(false);
      setIsClosingCategory(true); 
    }
  }, [isMouseOverSubcategory]);

  const handleMouseEnterSubcategory = () => {
    setIsMouseOverSubcategory(true);
    if (timerId) {
      clearTimeout(timerId);
    }
  };

  const handleMouseLeaveSubcategory = () => {
    setIsMouseOverSubcategory(false);
    if (isMouseOverCategory) {
      const id = setTimeout(() => {
        setExpandedCategory("");
      }, 500);
      setTimerId(id);
    }
  };

  const getSubCategory = async (categoryId: any) => {
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
        setExpandedCategory(categoryId);
      }
    } catch (e) {
      throw new Error();
    }
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    router.push(`/${selectedCategory}/${subcategoryId}`);
  };

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId)
    router.push(`/${selectedCategory}/${null}`)

  }

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isClosingCategory) {
      timerId = setTimeout(() => {
        setExpandedCategory("");
      }, 500);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isClosingCategory]);
  
  return (
      <Grid container sx={{ bgcolor: "white", height: 50 }}>
        {categories.map((category: Category) => {
          const isExpanded = category._id === expandedCategory;
          return (
            <Grid key={category._id} item xs={2} md={1} sx={{ mx: "auto" }}
            onMouseEnter={() => handleMouseEnterCategory(category._id)}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <Typography
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
              onClick={() => {
                isExpanded
                  ? setExpandedCategory("")
                  : getSubCategory(category._id),
                  setSelectedCategory(category._id);
                  handleCategoryChange(category._id)
              }}
              >
                {category.name}
              </Typography>
              {isExpanded ? (
                <Box
                  ref={subcategoryRef}
                  className={expandedCategory ? "fadeOut" : ""}
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
                        onClick={() => handleSubcategoryChange(subcategory._id)}
                        variant="body2"
                        sx={{
                          paddingLeft: 1,
                          textAlign: "left",
                          "&:hover": { color: "grey" },
                        }}
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
