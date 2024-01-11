import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import AddToCartButtom from './AddToCartButton';
import { useRouter } from 'next/router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product, UserState } from './types.interface';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, resetState } from '@/redux/actions';
import CartItems from '@/components/Cart';


const ProductsCard = ({products = []}:any) => {
  const favoriteProducts = useSelector((state:any) => state.favorites)
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [visibleProductsList, setVisibleProductsList] = useState<Product[]>([]);
  const [selectedAsFavorite, setSelectedAsFavorite ] = useState<string>("")
  const dispatch = useDispatch()

  
  useEffect(() => {
    if (window.location.pathname === '/') {
      setVisibleProductsList(products.slice(0, visibleProducts));
    } else {
      setVisibleProductsList(products);
    }
  }, [visibleProducts, products]);
  

  const handleToggleFavorite = (productId: string) => {

    const selectedProduct = products.find((product: any) => product._id === productId);

  
    if (selectedProduct) {
      const isFavorite = favoriteProducts.favorites.map((item: any)=> item._id).includes(productId);
      if (isFavorite) {
        dispatch(removeFromFavorites(productId));
      } else {

        dispatch(addToFavorites(selectedProduct));
      }
    }
  };

  
  useEffect(() => {
    handleToggleFavorite(selectedAsFavorite)
  },[selectedAsFavorite, setSelectedAsFavorite])
  

 
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
            sx={{ width: '100%', height: '98%'}}
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
            color={product ? 'error' : 'default'}
            onClick={() => setSelectedAsFavorite(product._id)}
          >
            {favoriteProducts.favorites.map((item:any) => item._id).includes(product._id)  ? 
             <FavoriteIcon /> : <FavoriteBorderIcon sx={{color:"grey"}}/>}
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
}

export default ProductsCard


 // const handleToggleFavorite = async (productId: string, isFavorite: boolean) => {
  //   try {
  //     const url = `http://localhost:8000/favorites/${user._id}/${isFavorite ? 'remove-from-favorites' : 'add-to-favorites'}`;
  
  //     const method = isFavorite ? 'DELETE' : 'POST';
  
  //     await fetch(url, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ productId }), 
  //     });
  
  //     const updatedProductsList = visibleProductsList.map((product: Product) => {
  //       if (product._id === productId) {
  //         return { ...product, isFavorite: !isFavorite };
  //       }
  //       return product;
  //     });
  
  //     setVisibleProductsList(updatedProductsList);
  //     const index = favoritesFromStorage.indexOf(productId);

  //     if (isFavorite) {
  //       if (index !== -1) {
  //         favoritesFromStorage.splice(index, 1);
  //       }
  //     } else {
  //       if (index === -1) {
  //         favoritesFromStorage.push(productId);
  //       }
  //     }
    
  //     localStorage.setItem('favorites', JSON.stringify(favoritesFromStorage));
   
  //   } catch (error) {
  //     console.error('Error al agregar a favoritos', error);
  //   }
  // };
  
  // useEffect(() => {
   
  //   const favoritesFromStorageString = localStorage.getItem('favorites');
  //   const favoritesFromStorage = favoritesFromStorageString ? JSON.parse(favoritesFromStorageString) : [];

  //   const updatedProductsList = products.map((product: Product) => ({
  //     ...product,
  //     isFavorite: favoritesFromStorage.includes(product._id),
  //   }));
  //   console.log("updatedProductsList", updatedProductsList)

  //   setVisibleProductsList(updatedProductsList);
  // }, [products]);

