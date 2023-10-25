import React,{ useState, useEffect} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import { Category } from '@/commons/types.interface'

const Categories = () => {
const [categories,setCategories] = useState([])
const [selectedCategory, setSelectedCategory] = useState("");
const [products, setProducts] = useState([]);


useEffect(()=> {
  async function getCategories(): Promise<void> {
    const response = await fetch('http://localhost:8000/categories', {method:"GET"})
    
    const data = await response.json()
    setCategories(data)
  
  }
  getCategories()
},[])

const handleCategoryClick = async (categoryId: string) => {
  // Realiza una solicitud para obtener los productos de la categoría seleccionada
  const response = await fetch(`http://localhost:8000/products?categoryID=${categoryId}`, {
    method: 'GET',
  });
  const data = await response.json();
  setProducts(data);
  setSelectedCategory(categoryId);
};


  return (
    <Box sx={{height: "60px",}}>
      <Grid container spacing={1}  sx={{ m:"auto"}}>

      {categories.map((category: Category) => {
          return (
            <Grid key={category._id} item xs={1} sx={{ mx: 'auto' }}>
              <Typography
                variant="h6"
                sx={{
                  color: category._id === selectedCategory ? 'grey' : 'black',
                  cursor: 'pointer',
                  p: 1,
                  fontWeight: 'bold',
                }}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </Typography>
            </Grid>
          );
        })}
</Grid>
    </Box>
  )
}

export default Categories