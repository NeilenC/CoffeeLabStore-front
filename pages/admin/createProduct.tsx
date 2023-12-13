// ProductForm.js
import React, { useEffect, useState } from 'react';
import { Box,  TextField, TextareaAutosize, Button, Select,MenuItem , Grid, Typography } from '@mui/material';
import { Category, SubCategory } from '@/commons/types.interface';

const ProductForm = () => {
const [categories,setCategories] = useState<Category[]>([])
const [subCategory, setSubcategory] = useState<SubCategory[]>([])
const [selectedSubcategory, setSelectedSubcategory] = useState({
  id: "",
  name: "",
});
const [selectedCategory, setSelectedCategory] = useState({
  id: "",
  name: "",
});
const [productData, setProductData] = useState({
  name: '',
  description: '',
  imageURL: '',
  price: '',
  stock: '',
  category: { id: "", name: "" },
  subcategory: { id: "", name: "" },
});

const handleChange = (e: any) => {
  const { name, value } = e.target;
  console.log("NAME VLAUE", name, value)
  if (name === "category") {
    const selectedCategory = categories.find((category) => category._id === value);
    setSelectedCategory({
      id: selectedCategory ? selectedCategory._id : "",
      name: selectedCategory ? selectedCategory.name : "",
    });
    setProductData((prevData) => ({
      ...prevData,
      category: {
        id: selectedCategory ? selectedCategory._id : "",
        name: selectedCategory ? selectedCategory.name : "",
      },
    }));
  } else if (name === "subcategory") {
    const selectedSubcategory = subCategory.find((subcategory) => subcategory._id === value);
    setSelectedSubcategory({
      id: selectedSubcategory ? selectedSubcategory._id : "",
      name: selectedSubcategory ? selectedSubcategory.name : "",
    });
    setProductData((prevData) => ({
      ...prevData,
      subcategory: {
        id: selectedSubcategory ? selectedSubcategory._id : "",
        name: selectedSubcategory ? selectedSubcategory.name : "",
      },
    }));
  } 
  
  
  else {
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {

    setProductData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  }
};
  
//------------------------ FUNCION CREAR PRODUCTO ------------------------ 
      const createProduct = async () => {
        try {
          const response = await fetch('http://localhost:8000/products/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
          if (response.ok) {

            console.log('Producto creado exitosamente');
          } else {
            console.error('Error al crear el producto', response);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
    

//------------------------ FUNCION OBTENER CATEGORIAS ------------------------ 
  
  useEffect(()=> {
    async function getCategories() {
      const response = await fetch('http://localhost:8000/categories', {method:"GET"})
      const dataPromise: Promise<Category[]> = response.json();
          
      const data = await dataPromise; 
      
      setCategories(data)
    }
    getCategories()
  },[])
  
//------------------------ FUNCION OBTENER SUBCATEGORIAS ------------------------ 

useEffect(()=>{
  const getSubCategory = async (selectedCategory:any) => {
    try{
      
      const response = await fetch(`http://localhost:8000/subcategory/${selectedCategory}`, {
        method: 'GET',
      });
      const dataPromise: Promise<SubCategory[]> =  response.json();
      const data = await dataPromise; 

      if(response.ok) {
        setSubcategory(data)
      }
    }catch(e){
      throw new Error
    }
  }
  getSubCategory(selectedCategory.id)
},[selectedCategory])


return (
  <Box sx={{p:10, display:"flex"}}>
    <Typography sx={{m:"auto", fontWeigth:"bold"}}> Crear un producto </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Nombre"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          placeholder="Descripción"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="URL de la imagen"
          name="imageURL"
          value={productData.imageURL}
          onChange={handleChange}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
      <input
        type="file"
        accept="image/*" 
        onChange={handleImageChange}
      />
    </Grid>
      <Grid item xs={6}>
        <TextField
          label="Precio"
          name="price"
          value={productData.price}
          onChange={handleChange}
          type="number"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Stock"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          type="number"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
      <Select
        name="category"
        value={selectedCategory.id || {} }
        onChange={handleChange}
        fullWidth
      >
    <MenuItem disabled>
      --Seleccione una categoría--
    </MenuItem>
    {categories.map((category) => (
      <MenuItem
        key={category._id}
        value={category._id}
        sx={{
          backgroundColor: selectedCategory.id === category._id ? 'lightgrey' : 'inherit',
          '&:hover': {
            backgroundColor: 'lightgrey',
          },
        }}
      >
        {category.name}
      </MenuItem>
    ))}
  </Select>
      
    <Select 
      fullWidth
      name="subcategory"
      value={selectedSubcategory.id || ''}
      onChange={handleChange}
    >
      <MenuItem value={''} disabled>
        --Seleccione una subcategoría--
      </MenuItem>
      {subCategory.map((subcategory) => (
        <MenuItem
          key={subcategory._id}
          value={subcategory._id}
          onClick={() => setSelectedSubcategory({
            id: subcategory._id,
            name: subcategory.name,
          })}
          sx={{
            backgroundColor: selectedSubcategory.id === subcategory._id ? 'lightgrey' : 'inherit',
            '&:hover': {
              backgroundColor: 'lightgrey',
            },
          }}
        >
          {subcategory.name}
        </MenuItem>
      ))}
  </Select>

      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" type="submit" onClick={createProduct}>
          Crear Producto
        </Button>
      </Grid>
    </Grid>
  </Box>
);
};

export default ProductForm;

  
  
