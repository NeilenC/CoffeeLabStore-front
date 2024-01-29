import React, { useState, useEffect } from "react";
import { Product } from "./types.interface";
import { Box, Card, CardContent, Typography } from "@mui/material";

const ProductDetails = ({ productId, quantity }:any) => {

  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/products/${productId}`);
        if (!response.ok) {
          throw new Error("Error fetching product details");
        }

        const data  = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <Box sx={{ }}>
      {productDetails ? (
        <Card >
          <Box
            component="img"
            src={productDetails.imageURL[0]}  
            alt={productDetails.name}
            sx={{ width: "100%", display: "block", margin: "auto" }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
              {productDetails.name}
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              Precio: {productDetails.price}
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              Cantidad: {quantity}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </Box>
  );

};

export default ProductDetails;
