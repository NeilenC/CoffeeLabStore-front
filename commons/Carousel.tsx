import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";
import Image from "next/image";

const ImageCarousel = ({ images }: any) => {
  return (
    <Box sx={{ maxHeight:'100vh' }}>
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
        <Box key={index} sx={{ maxWidth: "100%" }}>
          <Image
            src={image.src}
            alt={image.alt}
            // width={900}
            // height={700}
            layout="responsive"
            />
        </Box>
      ))}
    </Carousel>
      </Box>
  );
};

export default ImageCarousel;
