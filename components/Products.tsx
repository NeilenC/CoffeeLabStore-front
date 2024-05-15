import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import { Product } from "@/commons/types.interface";
import ProductsCard from "@/commons/ProductsCard";
import { getProducts } from "@/FetchFunctions/productsFetch";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ setProducts, products });
  }, []);

  return <ProductsCard products={products} />;
};

export default Products;
