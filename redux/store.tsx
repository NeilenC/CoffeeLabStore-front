import storage from "redux-persist/lib/storage";
import userReducer from "./UserReducer";
import favoritesReducer  from "./FavoritesReducer";
import { cartReducer } from "./CartReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    user: persistReducer({key: "user", storage }, userReducer),
    cart: persistReducer({ key: "carrito", storage }, cartReducer),
    favorites: persistReducer({ key: "favorites", storage }, favoritesReducer),
  },
});

export const persistor = persistStore(store);

export default store;
