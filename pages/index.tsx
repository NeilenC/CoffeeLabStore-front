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
import { Box, Divider, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const images = [
  { src: cafe, alt: "imagen" },
  { src: osloweb, alt: "imagen" },
  { src: trinity, alt: "imagen" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts({ setProducts, products });
  }, []);

  const coffeeProducts = products.filter(
    (product) => product.category.name === "Café",
  );
  const kitProducts = products.filter(
    (product) => product.category.name === "Accesorios",
  );
  const otherProducts = products.filter(
    (product) =>
      product.category.name !== "Accesorios" &&
      product.category.name !== "Café" &&
      product.category.name !== "Equipamiento",
  );

  return (
    <Box>
      <ImageCarousel images={images} />
      <Cafeteras />
      <Typography variant="h5" sx={{ p: 5, textAlign: "center" }}>
        {" "}
        Nuestros cafés{" "}
      </Typography>
      <ProductsCard products={coffeeProducts} />

      <Typography variant="h5" sx={{ p: 5, textAlign: "center" }}>
        {" "}
        Barista Tools
      </Typography>
      <ProductsCard products={kitProducts} />

      <Typography variant="h5" sx={{ p: 5, textAlign: "center" }}>
        {" "}
        Otros que te pueden interesar{" "}
      </Typography>
      <ProductsCard products={otherProducts} />
    </Box>
  );
}
