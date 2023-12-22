import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";
import Image from "next/image";

const ImageCarousel = ({ images }: any) => {
  return (
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
        <Box key={index} sx={{}}>
          <Image src={image.src} alt={image.alt} width={900} height={600} />
        </Box>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
