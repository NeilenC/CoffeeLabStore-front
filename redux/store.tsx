import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartReducer";
import userReducer from "./UserReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoritesReducer  from "./FavoritesReducer";

const store = configureStore({
  reducer: {
    user: persistReducer({key: "user", storage }, userReducer),
    cart: persistReducer({ key: "carrito", storage }, cartReducer),
    favorites: persistReducer({ key: "favorites", storage }, favoritesReducer),
  },
});

export const persistor = persistStore(store);

export default store;
