import React, { useState, useEffect, useRef } from "react";
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

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [subCategory, setSubcategory] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState("");
  const subcategoryRef = useRef<HTMLDivElement | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:8000/categories", {
        method: "GET",
      });
      const dataPromise: Promise<Category[]> = response.json();

      const data = await dataPromise;

      setCategories(data);
    }
    getCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        target &&
        subcategoryRef.current &&
        !subcategoryRef.current.contains(target)
      ) {
        setExpandedCategory("");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [subcategoryRef, timerId]);

  const handleMouseEnter = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
  };

  const handleMouseLeave = () => {
    if (expandedCategory) {
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
  return (
      <Grid container sx={{ bgcolor: "white", height: 50 }}>
        {categories.map((category: Category) => {
          const isExpanded = category._id === expandedCategory;
          return (
            <Grid key={category._id} item xs={2} md={1} sx={{ mx: "auto" }}>
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
