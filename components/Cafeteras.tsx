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
import { Category, SubCategory } from "@/commons/types.interface";

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
        const response = await fetch(`http://localhost:8000/subcategory`, {
          method: "GET",
        });

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
      sub.name.includes(cafeteraName.toLowerCase()),
    );
    if (matchedSubCategory) {
      router.push(`/${matchedSubCategory.category}/${matchedSubCategory._id}`);
    } else {
      console.log("no matchea");
    }
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", px: "25%", pt: 2, pb: 7 }}>
      <Box sx={{ justifyContent: "center", textAlign: "center", p: 5 }}>
        <Typography sx={{ fontWeight: "bold", margin: "auto" }}>
          Encontrá tu cafetera ideal acá
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2}>
          {cafeteras.map(({ img, alt, description }) => (
            <Box
              onClick={() => {
                handleCafeteraClick(alt);
              }}
              key={alt}
              sx={{
                textAlign: "center",
                m: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image alt={alt} src={img} height={80} width={80} />
              <Typography
                sx={{
                  m: "auto",
                  marginTop: "auto",
                  "&:hover": { color: theme.palette.text.secondary },
                  fontWeight: "bold",
                  width: "90%",
                }}
              >
                {description}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Cafeteras;
