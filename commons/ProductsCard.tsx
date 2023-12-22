import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import AddToCartButtom from './AddToCartButtom';
import { useRouter } from 'next/router';

const ProductsCard = ({products = []}:any) => {
  const [visibleProducts, setVisibleProducts] = useState(9);
  const router = useRouter()
  // const visibleProductsList = products.slice(0, visibleProducts);

  // const [visibleProducts, setVisibleProducts] = useState(10);
  const [visibleProductsList, setVisibleProductsList] = useState([]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      setVisibleProductsList(products.slice(0, visibleProducts));
    } else {
      setVisibleProductsList(products);
    }
  }, [visibleProducts, products]);

  return (
    <Grid container spacing={2} sx={{ maxWidth: "1300px", m: "auto", pb:5 }}>
      {visibleProductsList.map((product: any) => (
        <Grid item key={product._id} xs={2} sm={2} md={4}>
          <Card sx={{ display: "flex", flexDirection: "column", maxWidth: 350, p: 2, m: "auto" }}>
            <Link href={`/products/${product._id}`}>
              <Box sx={{ mx: "auto", height: 320, overflow: 'auto' }}>
                <Box component={'img'} src={product.imageURL[0]} sx={{ width: "95%", bgcolor: "pink" }} />
              </Box>
            </Link>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="body1" color="initial">
                {product.name}
              </Typography>
              <Typography variant="body2" color="black" sx={{ py: 1 }}>
                ${product.price}
              </Typography>
              <AddToCartButtom product={product} quantity={1} />
            </CardContent>
          </Card>
        </Grid>
      ))}
      {/* Botón "Ver más" */}
      {visibleProducts < products.length && window.location.pathname === '/' && (
        <Grid item xs={12} sx={{ py: 3, m:"auto"}}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={() => setVisibleProducts((prev) => prev + 9)}
            sx={{
              bgcolor: "#DAA520",
              p: 1,
              borderRadius: 8,
              color: "black",
              "&:hover": { color: "white" },
            }}
          >
            Ver más
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default ProductsCard
