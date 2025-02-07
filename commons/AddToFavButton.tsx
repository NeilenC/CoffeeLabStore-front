import { IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {  UserState } from './types.interface';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '@/redux/actions';

const AddToFavButton = ({product}: any) => {
  const userId = useSelector((state: UserState) => state.user._id);
  const favoriteProducts = useSelector((state: any) => state.favorites);
  const userFavorites = favoriteProducts.users[userId] || [];
  const dispatch = useDispatch()


const handleToggleFavorite = (productId: string) => {
  if (!userId) {
    toast.error("¡Debes iniciar sesión para agregar productos a favoritos!", {
      autoClose: 2000,
    });
    return; 
  }

  const isFavorite = userFavorites.includes(productId);

  if (isFavorite) {
    dispatch(removeFromFavorites(userId, productId));
  } else {
    dispatch(addToFavorites(userId, productId));
  }
};



  return (
    <IconButton
    color={userFavorites.includes(product?._id) ? "error" : "default"}
    onClick={() => handleToggleFavorite(product._id)}
  >
    {userFavorites.includes(product?._id) ? (
      <FavoriteIcon />
    ) : (
      <FavoriteBorderIcon sx={{ color: "grey" }} />
    )}
  </IconButton>
  )
}

export default AddToFavButton