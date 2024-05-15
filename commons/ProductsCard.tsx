import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import AddToCartButtom from "./AddToCartButton";
import { Product } from "./types.interface";
import AddToFavButton from "./AddToFavButton";
import useProductCard from "@/Hooks/useProductCard";

const ProductsCard = ({ products = [] }: any) => {
  const {
    visibleProducts,
    setVisibleProducts,
    visibleProductsList,
    ruta,
    isSmallScreen,
    isMediumScreen,
  } = useProductCard(products);

  return (
    <Grid container>
      {visibleProductsList.map((product: Product) => (
      <Grid item xs={isMediumScreen ? (isSmallScreen ? 12 : 6) : 4} sx={{ p: 1, }}>
          <Card
            key={product._id}
            sx={{
              maxWidth: 282,
              p: 2,
              m: "auto",
            }}
          >
            <Link href={`/products/${product._id}`}>
              <Box
                sx={{
                  height: 257,
                  overflow: "auto",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={product.imageURL[0]}
                  sx={{ width: 250, overflow: "scroll" }}
                />
              </Box>
            </Link>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="body1" color="initial" noWrap>
                {product.name.length > 25
                  ? `${product.name.substring(0, 25)}...`
                  : product.name}
              </Typography>
              <Box
                color="black"
                sx={{ py: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body1" sx={{ my: "auto" }}>
                  ${product.price}
                </Typography>

                <AddToFavButton product={product} />
              </Box>

              <AddToCartButtom product={product} quantity={1} />
            </CardContent>
          </Card>
          </Grid>
        // </Grid>
      ))}

      {/* Botón "Ver más" */}
      {visibleProducts < products.length &&
        window.location.pathname === "/" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              width: { xs: "100%", md: "100%" },
            }}
          >
            <Button
              variant="contained"
              onClick={() => setVisibleProducts((prev) => prev + 8)}
              sx={{
                borderRadius: 8,
                color: "black",
                "&:hover": { color: "white", bgcolor: "black" },
                width: { xs: "80%", md: "90%" },
              }}
            >
              Ver más
            </Button>
          </Box>
        )}
    </Grid>
  );
};

export default ProductsCard;
