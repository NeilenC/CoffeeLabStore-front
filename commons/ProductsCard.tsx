import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import AddToCartButtom from './AddToCartButton';
import { useRouter } from 'next/router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product, UserState } from './types.interface';
import { useSelector } from 'react-redux';


const ProductsCard = ({products = []}:any) => {

  const [visibleProducts, setVisibleProducts] = useState(9);
  const [visibleProductsList, setVisibleProductsList] = useState<Product[]>([]);
  const user = useSelector((state:UserState) => state.user)
  const router = useRouter()
  const favoritesFromStorageString = localStorage.getItem('favorites');
  const favoritesFromStorage = favoritesFromStorageString ? JSON.parse(favoritesFromStorageString) : [];


  useEffect(() => {
    if (window.location.pathname === '/') {
      setVisibleProductsList(products.slice(0, visibleProducts));
    } else {
      setVisibleProductsList(products);
    }
  }, [visibleProducts, products]);


  const handleToggleFavorite = async (productId: string, isFavorite: boolean) => {
    try {
      const url = `http://localhost:8000/favorites/${user._id}/${isFavorite ? 'remove-from-favorites' : 'add-to-favorites'}`;
  
      const method = isFavorite ? 'DELETE' : 'POST';
  
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }), 
      });
  
      const updatedProductsList = visibleProductsList.map((product: Product) => {
        if (product._id === productId) {
          return { ...product, isFavorite: !isFavorite };
        }
        return product;
      });
  
      setVisibleProductsList(updatedProductsList);
      const index = favoritesFromStorage.indexOf(productId);

      if (isFavorite) {
        // Si el producto ya es favorito, quítalo de la lista
        if (index !== -1) {
          favoritesFromStorage.splice(index, 1);
        }
      } else {
        // Si el producto no es favorito, agrégalo a la lista
        if (index === -1) {
          favoritesFromStorage.push(productId);
        }
      }
    
      // Actualiza el estado en el localStorage
      localStorage.setItem('favorites', JSON.stringify(favoritesFromStorage));
   
    } catch (error) {
      console.error('Error al agregar a favoritos', error);
    }
  };
  
  useEffect(() => {
   
    const favoritesFromStorageString = localStorage.getItem('favorites');
    const favoritesFromStorage = favoritesFromStorageString ? JSON.parse(favoritesFromStorageString) : [];

    const updatedProductsList = products.map((product: Product) => ({
      ...product,
      isFavorite: favoritesFromStorage.includes(product._id),
    }));

    setVisibleProductsList(updatedProductsList);
  }, [products]);


  return (
    <Grid container  sx={{ maxWidth: "1300px", m: "auto", pb:5 }}>
   {visibleProductsList.map((product: Product) => (
  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} sx={{ p: 2 }}>
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 350, p: 2, m: 'auto' }}>
      <Link href={`/products/${product._id}`}>
        <Box sx={{ mx: 'auto', height: 320, overflow: 'auto' }}>
          <Box
            component="img"
            src={product.imageURL[0]}
            sx={{ width: '100%', height: '98%', objectFit: 'cover' }}
          />
        </Box>
      </Link>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="body1" color="initial">
          {product.name}
        </Typography>
        <Box  color="black" sx={{ py: 1, display: 'flex',justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ my:"auto"}}>${product.price}</Typography>
          <IconButton
            color={product.isFavorite ? 'error' : 'default'}
            onClick={() => handleToggleFavorite(product._id, product.isFavorite)}
          >
            {product.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
    
        <AddToCartButtom product={product} quantity={1} />
    
      </CardContent>
    </Card>
  </Grid>
))}

      {/* Botón "Ver más" */}
      {visibleProducts < products.length && window.location.pathname === '/' && (
      
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, width: { xs: "100%", md: "100%" }, }}>
        <Button
          variant="contained"
          onClick={() => setVisibleProducts((prev) => prev + 9)}
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
}

export default ProductsCard
