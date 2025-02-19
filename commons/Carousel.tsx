import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

const ImageCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: isSmallScreen ? "300px" : "500px", 
        overflow: "hidden",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        autoPlay={false}
        interval={5000}
        stopOnHover={false}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              height: isSmallScreen ? "300px" : "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={isSmallScreen ? 600 : 900} 
              height={isSmallScreen ? 300 : 500}
              style={{ objectFit: "cover", width: "100%", height: "auto" }} 
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
