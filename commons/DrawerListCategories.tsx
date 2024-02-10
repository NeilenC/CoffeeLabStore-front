import React, { useState } from 'react';
import { Drawer, Typography, Grid, Box } from '@mui/material';
import { SubCategory } from './types.interface';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const DrawerListCategories = ({ category, subCategory, selectedSubCategory, setSelectedSubCategory, categoryId}: any) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <Box sx={{ 
                width: "16%" , ml:10
            }}>
                <Typography
                    variant="h5"
                    sx={{ 
                        fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,}}
                    onClick={() => setDrawerOpen(true)}
                >
                    {category} 
                  {drawerOpen ?  <KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/> }
                </Typography>
            </Box>

            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        {category}
                    </Typography>
                    <Grid container spacing={2}>
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
                                    color: selectedSubCategory === subcategory.name ? "#DAA520" : "inherit",
                                }}
                                onClick={() => {
                                    router.push(`/${categoryId}/${subcategory._id}`);
                                    setSelectedSubCategory(subcategory.name);
                                    setDrawerOpen(false); // Cerrar el drawer después de seleccionar una subcategoría
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {subcategory.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Drawer>
        </>
  )
}

export default DrawerListCategories