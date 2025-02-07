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


const ProductsCard = ({ products = [] }: any) => {
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [visibleProductsList, setVisibleProductsList] = useState<Product[]>([]);
  const router = useRouter()
  const ruta = router.pathname  
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const isMediumScreen = useMediaQuery('(max-width: 1000px)')

  useEffect(() => {
    if (window.location.pathname === "/") {
      setVisibleProductsList(products.slice(0, visibleProducts));
    } else {
      setVisibleProductsList(products);
    }
  }, [visibleProducts, products]);

  return (
    <Box sx={{ 
      display: "flex",
      flexDirection: "row", 
      flexWrap: "wrap", 
      // pl: 1,
       justifyContent: ruta == '/' || ruta == '/favorites'  && isSmallScreen || isMediumScreen ? "center" :  null ,
       maxWidth: "100%", 

      }}>
    {visibleProductsList.map((product: Product) => (
    <Box sx={{ p:1,  flex: "0 0 30%", }}>
      <Card
        key={product._id} 
        sx={{
          maxWidth: 282,
          p: 2,
          m: "auto", 
        }}
      >
       
            <Link href={`/products/${product._id}`}>
              <Box sx={{ 
                 height: 257,
                 overflow: "auto", justifyContent:"center", }}>
                <Box
                  component="img"
                  src={product.imageURL[0]}
                  sx={{ width: 250,  overflow:"scroll"
                }}
                />
              </Box>
            </Link>
            <CardContent sx={{ p: 0 }}>
            <Typography variant="body1" color="initial" noWrap>
                {product.name.length > 25 ? `${product.name.substring(0, 25)}...` : product.name}
            </Typography>
              <Box
                color="black"
                sx={{ py: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body1" sx={{ my: "auto" }}>
                  ${product.price}
                </Typography>
                
                <AddToFavButton product={product}  />
              </Box>

              <AddToCartButtom product={product} quantity={1} />
            </CardContent>
          </Card>
          </Box>
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
    </Box>
  );
};

export default ProductsCard;
