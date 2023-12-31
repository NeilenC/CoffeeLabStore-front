import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Product } from "@/commons/types.interface";
import { UserState } from "@/commons/types.interface";
import useUserData from "@/Hooks/useUserData";
import ProductsCard from "@/commons/ProductsCard";
import { getProducts } from "@/functions";

const Products = () => {
  useUserData();
  const [products, setProducts] = useState<Product[]>([]);
  const user = useSelector((state: UserState) => state.user);


  useEffect(() => {
    getProducts({setProducts, products});
  }, []);

  return (
      <ProductsCard products={products} />
  );
};

export default Products;