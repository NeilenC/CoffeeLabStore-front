import React from 'react'
import {
    Box,
    Grid,
    Typography,
  } from "@mui/material";
import { useRouter } from 'next/router';
import { SubCategory } from './types.interface';
import theme from '@/styles/theme';

const SideBarCategories = ({ category, subCategory, selectedSubCategory, setSelectedSubCategory, categoryId }: any) => {
    const router = useRouter();
  
    return (
    <Box sx={{ 
        width: "16%" 
      }}>
        <Typography
          variant="h5"
          sx={{ justifyContent: "center", p: 4, fontWeight: "bold" }}
        >
          {category}
        </Typography>
        <Grid container spacing={2} sx={{ ml: 2}}>
          {subCategory.map((subcategory: SubCategory) => (
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
              <Typography sx={{ fontWeight: "bold",  }}>
                {subcategory.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
  )
}

export default SideBarCategories