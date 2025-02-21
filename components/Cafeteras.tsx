import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import prensa from "../public/prensa.png";
import filtro from "../public/cafetera-de-filtro.png";
import italiana from "../public/cafetera-italiana.png";
import chemex from "../public/chemex.png";
import espresso from "../public/espresso.png";
import aeropress from "../public/aeropress.png";
import Image from "next/image";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import { SubCategory } from "@/commons/types.interface";

const cafeteras = [
  { img: chemex, alt: "chemex", description: "Chemex" },
  { img: aeropress, alt: "aeropress", description: "Aeropress" },
  { img: filtro, alt: "filtro", description: "Filtro" },
  { img: italiana, alt: "italiana", description: "Italiana" },
  { img: espresso, alt: "espresso", description: "Espresso" },
  { img: prensa, alt: "prensa", description: "Prensa francesa" },
];

const Cafeteras = () => {
  const router = useRouter();
  const [subCategory, setSubcategory] = useState<SubCategory[]>([]);

  useEffect(() => {
    const getSubCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/subcategory`,
          {
            method: "GET",
          }
        );

        const dataPromise = response.json();
        const data = await dataPromise;

        if (response.ok) {
          setSubcategory(data);
        }
      } catch (e) {
        console.log("error:", e);
      }
    };
    getSubCategory();
  }, []);

  const handleCafeteraClick = (cafeteraName: string) => {
    const matchedSubCategory = subCategory.find((sub) =>
      sub.name.includes(cafeteraName.toLowerCase())
    );

    if (matchedSubCategory) {
      router.push(`/${matchedSubCategory.category}/${matchedSubCategory._id}`);
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        bgcolor: "#eeeeee",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", margin: "auto", py: 2 }}
      >
        Encontra tu cafetera ideal acá
      </Typography>
      <Grid
        container
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        {cafeteras.map(({ img, alt, description }) => (
          <Grid
            item
            xs={4}
            sm={2}
            md={1}
            lg={1}
            key={alt}
            sx={{
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
              "&:hover": { color: "text.secondary" },
              py:2
            }}
            onClick={() => handleCafeteraClick(alt)}
          >
            {/* Imagen */}
            <Image alt={alt} src={img} height={80} width={80} />
            {/* Descripción */}
            <Typography
              sx={{ fontWeight: "bold", mt: 1, width: "90%", mx: "auto" }}
            >
              {description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cafeteras;
