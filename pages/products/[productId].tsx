import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChangeEvent } from 'react';
import { Product } from "@/commons/types.interface";
import AddToCartButtom from "@/commons/AddToCartButton";
import BuyButton from "@/commons/BuyButton";

const initialProductState: Product = {
  _id: '',
  name: '',
  imageURL: [''],
  price: 0,
  stock: 0,
  description: '',
  category: { _id: '', name: '', description: '' },
  subcategory: { _id: '', name: '', category: '' },
  quantity: 0,
  isFavorite: false,
  productPreferences: {
    grind: '', 
  },
};

const ProductDetail = () => {

  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | null>(initialProductState);
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [actualImage, setActualImage] = useState<string | null>(null);
  const [selectedGrind, setSelectedGrind] = useState<string>('Grano-default');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const itemsPerPage = 3;


  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };

  const handleGrindChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    setSelectedGrind(selectedValue);
  
    // Actualizar el estado del producto con la molienda seleccionada
    if (product !== null) {
      setProduct((prevProduct: Product | null) => ({
        ...prevProduct!,
        productPreferences: {
          ...prevProduct!.productPreferences,
          grind: selectedValue,
        },
      }));
      
    }
  };
  

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(
          `http://localhost:8000/products/${productId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);


  const handleImageHover = () => {
    setIsImageHovered(true);
  };

  const handleImageLeave = () => {
    setIsImageHovered(false);
  };

  const handleClickThumbnail = (index: number) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    if (product && product.imageURL?.length > 0) {
      setActualImage(product.imageURL[0]);
      setSelectedImageIndex(0);
    }
  }, [product]);

  const handleClickImage = (image: any) => {
    setActualImage(image)
  }


  return (
    <Box sx={{ p: 5, display: "flex", height: "100%" }}>
      {product ? (
        <Grid container spacing={1} sx={{ m: "auto" }}>
          <Grid item xs={4} sx={{ m: "auto" }}>
            <Box
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
              sx={{
                overflow: "hidden",
                transform: isImageHovered ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                component='img'
                src={actualImage || undefined}
                width={600}
                height={650}
                alt={product.name}
              />
            </Box>
              <Box>
                {product.imageURL?.map((image, index) => (
              <Box
                component= 'img'
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ width: '50px', marginRight: '5px', cursor: 'pointer' }}
                onClick={() => {handleClickThumbnail(index), handleClickImage(image)}}
              />
            ))}
              </Box>
          </Grid>
          <Grid item xs={5} sx={{ my: "60px" }}>
            <Typography variant="h4">{product.name}</Typography>
            <Divider sx={{ my: 3, color: "black" }} />
            <Typography variant="body2" sx={{py:1}}>Precio: ${product.price}</Typography>
            <Typography variant="body2" component="div">
                Descripción:
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {product.description}
                </pre>
              </Typography>

            {product.stock > 0 ? 
            <Typography variant="body2">Disponibles: {product.stock }</Typography>
            :
            <Typography variant="body2" sx={{pt:2, color: "red"}}> No hay stock disponible para este producto </Typography>
             }
            <Box sx={{display:"flex"}}>
            <Box sx={{ p: 2 }}>
              <TextField
                type="number"
                label="Cantidad"
                variant="outlined"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={product.stock <= 0}
                inputProps={{ min: 1, max: product.stock }}
              />
            </Box>
            {product.category.name === "Café" ? 
            <FormControl sx={{ p: 2, minWidth: 200 }}>
               <Select
                    labelId="grind-label"
                    id="grind"
                    value={selectedGrind}
                    onChange={handleGrindChange}
                  >
               
                <MenuItem value="Grano-default">Grano</MenuItem>
                <MenuItem value="Método turco">Método turco</MenuItem>
                <MenuItem value="Espresso">Espresso</MenuItem>
                <MenuItem value="Aeropress">Aeropress</MenuItem>
                <MenuItem value="V-60">V-60</MenuItem>
                <MenuItem value="Chemex">Chemex</MenuItem>
                <MenuItem value="Cafetéra eléctrica">Cafetéra eléctrica</MenuItem>
                <MenuItem value="Prensa francesa">Prensa francesa</MenuItem>
              </Select>
            </FormControl>
              : null }
              </Box>
            <Box>
              <AddToCartButtom product={product} quantity={quantity} />
            </Box>
           <BuyButton product={product} quantity={quantity}/>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ m: "auto", pt: 8, fontSize: "25px" }}>
          {" "}
          <CircularProgress />{" "}
        </Box>
      )}
    </Box>
  );
};

export default ProductDetail;
