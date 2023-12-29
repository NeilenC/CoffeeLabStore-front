// ProductForm.js
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { Category, SubCategory } from "@/commons/types.interface";
import { getCategories, getSubCategories } from "@/functions";
import toast from "react-hot-toast";

const ProductForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategory, setSubcategory] = useState<SubCategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState({
    id: "",
    name: "",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    imageURL: [],
    price: "",
    stock: "",
    category: { id: "", name: "" },
    subcategory: { id: "", name: "" },
    keys: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category._id === value,
      );
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
      const selectedSubcategory = subCategory.find(
        (subcategory) => subcategory._id === value,
      );
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
      
    } else if (name === "keys") {
      setProductData((prevData) => ({
        ...prevData,
        keys: value.split(/\s+/),
      }));
    }  else if (name === "imageURL") {
      setProductData((prevData) => ({
        ...prevData,
        [name]: Array.isArray(value) ? value : value.split(/\s+/),
      }));
    }  else {
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

  //------------------------ RESETEAR FORMULARIO ------------------------

  const resetForm = () => {
    setSelectedCategory({ id: "", name: "" });
    setSelectedSubcategory({ id: "", name: "" });
    setProductData({
      name: "",
      description: "",
      imageURL: [],
      price: "",
      stock: "",
      category: { id: "", name: "" },
      subcategory: { id: "", name: "" },
      keys: [],
    });
  };

  //------------------------ FUNCION CREAR PRODUCTO ------------------------
  const createProduct = async () => {
    try {
      const response = await fetch("http://localhost:8000/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        toast.success('Producto creado exitosamente');
        resetForm()
      
      } else {
        toast.error("Error al crear el producto")
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  //------------------------ FUNCION OBTENER CATEGORIAS ------------------------

  useEffect(() => {
    getCategories({setCategories});
  }, []);

  //------------------------ FUNCION OBTENER SUBCATEGORIAS ------------------------

  useEffect(() => {
   const category = selectedCategory.id
    getSubCategories({selectedCategory: category, setSubcategory});
  }, [selectedCategory]);



  return (
    <Box sx={{ p: 10, display: "flex" }}>
      <Typography sx={{ m: "auto", fontWeigth: "bold" }}>
        {" "}
        Crear un producto{" "}
      </Typography>
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
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="URL de la imagen"
            name="imageURL"
            value={Array.isArray(productData.imageURL)
              ? productData.imageURL.join(" ")
              : productData.imageURL}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
            value={selectedCategory.id || {}}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem disabled>--Seleccione una categoría--</MenuItem>
            {categories.map((category) => (
              <MenuItem
                key={category._id}
                value={category._id}
                sx={{
                  backgroundColor:
                    selectedCategory.id === category._id
                      ? "lightgrey"
                      : "inherit",
                  "&:hover": {
                    backgroundColor: "lightgrey",
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
            value={selectedSubcategory.id || ""}
            onChange={handleChange}
          >
            <MenuItem value={""} disabled>
              --Seleccione una subcategoría--
            </MenuItem>
            {subCategory.map((subcategory) => (
              <MenuItem
                key={subcategory._id}
                value={subcategory._id}
                onClick={() =>
                  setSelectedSubcategory({
                    id: subcategory._id,
                    name: subcategory.name,
                  })
                }
                sx={{
                  backgroundColor:
                    selectedSubcategory.id === subcategory._id
                      ? "lightgrey"
                      : "inherit",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
          <Grid item xs={12}>
            <TextField
              label="Palabras clave (separadas por espacio)"
              name="keys"
              value={Array.isArray(productData.keys)
                ? productData.keys.join(" ")
                : productData.keys}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
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
