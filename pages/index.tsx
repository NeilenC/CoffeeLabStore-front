import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import cafe from "../public/carousel/cafe.png";
import baristatools from "../public/carousel/baristatools.webp";
import osloweb from "../public/carousel/osloweb.png";
import trinity from "../public/carousel/trinity.png";
import ImageCarousel from "@/commons/Carousel";
import Footer from "@/components/Footer";
import Cafeteras from "@/components/Cafeteras";
import ProductsCard from "@/commons/ProductsCard";
import { getProducts } from "@/functionsFetch";
import { Product } from "@/commons/types.interface";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const images = [
  { src: cafe.src, alt: "imagen" },
  { src: osloweb.src, alt: "imagen" },
  { src: trinity.src, alt: "imagen" },
  { src: baristatools.src, alt: "imagen" },
];

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [visibleProductsList, setVisibleProductsList] = useState<Product[]>([]);
  const router = useRouter();
  const ruta = router.pathname;
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 1000px)");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setVisibleProductsList(products.slice(0, visibleProducts));
    } else {
      setVisibleProductsList(products);
    }
  }, [visibleProducts, products]);

  useEffect(() => {
    getProducts({ setProducts, products });
  }, []);

  const coffeeProducts = products.filter(
    (product) => product.category.name === "Café"
  );
  const kitProducts = products.filter(
    (product) => product.category.name === "Accesorios"
  );
  const otherProducts = products.filter(
    (product) =>
      product.category.name !== "Accesorios" &&
      product.category.name !== "Café" &&
      product.category.name !== "Equipamiento"
  );

  return (
    <Box>
      <ImageCarousel images={images} />
      <Cafeteras />
      <Typography variant="h3" sx={{ p: 5, textAlign: "center" }}>
        {" "}
        Nuestros cafés{" "}
      </Typography>


  <ProductsCard products={coffeeProducts} />

      <Typography variant="h3" sx={{ p: 5, textAlign: "center" }}>
        {" "}
      Herramientas para Baristas
      </Typography>

      <ProductsCard products={kitProducts} />

      <Typography variant="h3" sx={{ p: 5, textAlign: "center" }}>
        {" "}
        Otros que te pueden interesar{" "}
      </Typography>
      <ProductsCard products={otherProducts} />
    </Box>
  );
}
