import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import cafe from "../public/cafe.png";
import osloweb from "../public/osloweb.png";
import trinity from "../public/trinity.png";
import ImageCarousel from "@/commons/Carousel";
import Footer from "@/components/Footer";
import Cafeteras from "@/components/Cafeteras";
import ProductsCard from "@/commons/ProductsCard";
import { getProducts } from "@/functions";
import { Product } from "@/commons/types.interface";

const inter = Inter({ subsets: ["latin"] });

const images = [
  { src: cafe, alt: "imagen" },
  { src: osloweb, alt: "imagen" },
  { src: trinity, alt: "imagen" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  getProducts({setProducts, products});
}, []);

  return (
    <>
      <ImageCarousel images={images} />
      <Cafeteras />
      <ProductsCard products={products}/>
    </>
  );
}
