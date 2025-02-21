import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import AddToCartButtom from "./AddToCartButton";
import { Product } from "./types.interface";
import AddToFavButton from "./AddToFavButton";
import { useRouter } from "next/router";

const ProductsCard = ({ products = [], isInSubcategory = false }: any) => {
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [visibleProductsList, setVisibleProductsList] = useState<Product[]>([]);
  const router = useRouter();
  const ruta = router.pathname;
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (window.location.pathname === "/") {
      setVisibleProductsList(products.slice(0, visibleProducts));
    } else {
      setVisibleProductsList(products);
    }
  }, [visibleProducts, products]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isInSubcategory ? "flex-start" : "center",
        alignItems: "center",
        py: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: isInSubcategory ? "100%" : "90%",
          minWidth: isInSubcategory ? "100%" : "90%",
          p: 1,
          bgcolor: "#eeeeee",
          borderRadius: "4px",
          alignSelf: "center",
        }}
      >
        {visibleProductsList.map((product: Product) => (
          <Box
            key={product._id}
            sx={{
              display: "flex",
              p: 1,
              boxSizing: "border-box",
              // Ajustar el tamaño de las cards si estamos en subcategoría
              flex: {
                xs: "1 1 50%",
                sm: "1 1 33.33%",
                md: isInSubcategory ? "1 1 33%" : "1 1 25%",
              },
              minWidth: {
                xs: "50%",
                sm: "33.33%",
                md: isInSubcategory ? "150px" : "25%",
              },
              maxWidth: {
                xs: "50%",
                sm: "33.33%",
                md: isInSubcategory ? "250px" : " 25%",
              },
            }}
          >
            <Card
              sx={{
                width: "100%",
                m: "auto",
              }}
            >
              <Link href={`/products/${product._id}`}>
                <Box
                  sx={{
                    height: { xs: 180, sm: 200, md: 250 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={product.imageURL[0]}
                    sx={{
                      maxHeight: { xs: 140, sm: 180, md: 220 },
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Link>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Typography variant="body1" color="initial" noWrap>
                  {product.name.length > 25
                    ? `${product.name.substring(0, 25)}...`
                    : product.name}
                </Typography>
                <Box
                  color="black"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" sx={{ my: "auto" }}>
                    ${product.price}
                  </Typography>
                  <AddToFavButton product={product} />
                </Box>
                <AddToCartButtom product={product} quantity={1} />
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Botón "Ver más" */}
        {visibleProducts < products.length &&
          window.location.pathname === "/" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                width: "100%",
                pb: 1,
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
      </Box>
    </Box>
  );
};

export default ProductsCard;
