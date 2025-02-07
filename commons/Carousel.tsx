import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";
import Image from "next/image";

const ImageCarousel = ({ images }: any) => {
  return (
    <Box
      sx={{
        height: "500px",
        overflow: "hidden",
        position: "relative", // Asegura que el z-index funcione correctamente
        zIndex: 0, // Menor que la navbar (que debería tener un z-index mayor)
      }}
    >
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={false}
        interval={5000}
        stopOnHover={false}
      >
        {images.map((image: any, index: any) => (
          <Box
            key={index}
            sx={{
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={500} // Mantiene la proporción ajustándose al alto del contenedor
              style={{ objectFit: "cover" }} // Hace que la imagen cubra el espacio sin distorsionarse
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
