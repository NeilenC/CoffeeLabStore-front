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
import AddToCartButtom from "@/commons/AddToCartButtom";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);

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
              <Image
                src={product.imageURL[0]}
                width={600}
                height={650}
                alt={product.name}
              />
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ my: "100px" }}>
            <Typography variant="h4">{product.name}</Typography>
            <Divider sx={{ my: 3, color: "black" }} />
            <Typography variant="body1">Precio: ${product.price}</Typography>
            <Typography variant="body1">
              Descripción: {product.description}
            </Typography>
            <Typography variant="body1">Stock: {product.stock}</Typography>
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
