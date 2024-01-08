import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Product } from "@/commons/types.interface";
import AddToCartButtom from "@/commons/AddToCartButton";
import BuyButton from "@/commons/BuyButton";

const ProductDetail = () => {

  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [actualImage, setActualImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const itemsPerPage = 3;


  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
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
    if (product && product.imageURL.length > 0) {
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
          <Grid item xs={5} sx={{ my: "100px" }}>
            <Typography variant="h4">{product.name}</Typography>
            <Divider sx={{ my: 3, color: "black" }} />
            <Typography variant="body1">Precio: ${product.price}</Typography>
            <Typography variant="body1">
              Descripción: {product.description}
            </Typography>
            <Typography variant="body1">Disponibles: {product.stock}</Typography>
            <Box sx={{ py: 3 }}>
              <TextField
                type="number"
                label="Cantidad"
                variant="outlined"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.stock }}
              />
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
