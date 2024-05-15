import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product, UserState } from './types.interface';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '@/redux/actions';
import { getProducts } from '@/FetchFunctions/productsFetch';

const AddToFavButton = ({product}: any) => {
  const user = useSelector((state: UserState) => state.user);
  const userId = user?._id
  const favoriteProducts = useSelector((state: any) => state.favorites);
  const userFavorites = favoriteProducts.users[userId] || [];
  const [selectedAsFavorite, setSelectedAsFavorite] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([])
  const dispatch = useDispatch()

// useEffect(() => {
//     getProducts({ setProducts, products })
// },[favoriteProducts])

 useEffect(() => {
  if (selectedAsFavorite) {
    getProducts({ setProducts, products });
  }
}, [selectedAsFavorite]);

useEffect(() => {
  const handleToggleFavorite = async (productId: string) => {
    console.log("productId", productId);

    try {
      const selectedProduct = await products.find(
        (product: any) => product._id === productId,
      );
      console.log("selectedproduc", selectedProduct);
      if (selectedProduct) {
        console.log("ACA ESTAMOS");
        const isFavorite = userFavorites.includes(productId);
        console.log("isFavorite", isFavorite);

        if (isFavorite) {
          dispatch(removeFromFavorites(userId, productId));
        } else {
          dispatch(addToFavorites(userId, productId));
        }
      }
      console.log("NO ENTRA");

    } catch (error) {
      console.log(error);
    }
  };

  // Llama a handleToggleFavorite dentro del useEffect
  if (selectedAsFavorite !== "") {
    handleToggleFavorite(selectedAsFavorite);
  }
}, [selectedAsFavorite, user, products]);


    

  return (
    <IconButton
      color={product ? "error" : "default"}
      onClick={() => setSelectedAsFavorite(product._id)}
    >
      {
      
      userFavorites.includes(product?._id) ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon sx={{ color: "grey" }} />
      )}
    </IconButton>
  )
}

export default AddToFavButton