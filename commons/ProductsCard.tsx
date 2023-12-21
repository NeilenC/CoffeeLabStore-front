import React, { useEffect, useState } from 'react'
import { Product } from './types.interface';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import AddToCartButtom from './AddToCartButtom';
import { getProducts } from '@/Hooks/functions';

const ProductsCard = ({products = []}:any) => {
  const [visibleProducts, setVisibleProducts] = useState(9);
  const visibleProductsList = products.slice(0, visibleProducts);

  return (
    <Grid container spacing={3} sx={{ ml: 0}}>
    {products.map((product:any) => (
      <Grid item key={product._id} xs={9} sm={6} md={4} sx={{}}>
          <Card sx={{ display: "flex", flexDirection: "column", maxWidth:350, p:2 }}>
            <Link href={`/products/${product._id}`}>
              <Box sx={{ mx: "auto", height: 320, overflow: 'auto' }}>
                <Box component={'img'} src={product.imageURL[0]} sx={{ width:"95%"}}/>
              </Box>
            </Link>
            <CardContent sx={{p:0}}>
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
    <Box>
        {visibleProducts < products.length && (
          <Box sx={{ p: 3 }}>
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
          </Box>
        )}
      </Box>
  </Grid>
  )
}

export default ProductsCard
