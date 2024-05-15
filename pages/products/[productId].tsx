import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/commons/types.interface";
import AddToCartButtom from "@/commons/AddToCartButton";
import BuyButton from "@/commons/BuyButton";
import { fetchProductDetails } from "@/FetchFunctions/productsFetch";

const initialProductState: Product = {
  _id: "",
  name: "",
  imageURL: [""],
  price: 0,
  stock: 0,
  description: "",
  category: { _id: "", name: "", description: "" },
  subcategory: { _id: "", name: "", category: "" },
  quantity: 0,
  isFavorite: false,
  productPreferences: {
    grind: "",
  },
};

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | null>(initialProductState);
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [actualImage, setActualImage] = useState<string | null>(null);
  const [selectedGrind, setSelectedGrind] = useState<string>("Grano-default");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const itemsPerPage = 3;
  const isMediumScreen = useMediaQuery('(max-width: 950px)')
    const isMinScreen = useMediaQuery('(max-width: 400)')
    const isMidScreen = useMediaQuery('(max-width: 800px)')
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };

  const handleGrindChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    setSelectedGrind(selectedValue);

    // Actualizar el estado del producto con la molienda seleccionada
    if (product !== null) {
      setProduct((prevProduct: Product | null) => ({
        ...prevProduct!,
        productPreferences: {
          ...prevProduct!.productPreferences,
          grind: selectedValue,
        },
      }));
    }
  };


  useEffect(() => {

    if (productId) {
      fetchProductDetails({productId, setProduct});
    }
  }, [productId]);

  const handleImageHover = () => {
    setIsImageHovered(true);
  };

  const handleImageLeave = () => {
    setIsImageHovered(false);
  };

  const handleClickThumbnail = (index: number) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    if (product && product.imageURL?.length > 0) {
      setActualImage(product.imageURL[0]);
      setSelectedImageIndex(0);
    }
  }, [product]);

  const handleClickImage = (image: any) => {
    setActualImage(image);
  };

  return (
    <Box sx={{ 
      p: 2, 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
          pt: !isMediumScreen || !isMidScreen ? "3%" : "10%",
          alignItems: "center" ,
    }}>
    {product ? (
      <Grid container >
     
      <Grid item xs={12} sm={6} 
       sx={{ 
        alignItems: "center",  
        maxWidth:"90%",
        m:"auto",
        height:"100%"
      }}>
  <Box
    onMouseEnter={handleImageHover}
    onMouseLeave={handleImageLeave}
    sx={{
      overflow: "hidden",
      transform: isImageHovered ? "scale(1.1)" : "scale(1)",
      transition: "transform 0.3s",
      display: "flex",
      justifyContent: "center", 
      width: isMediumScreen || isSmallScreen ? "100%" : "80%",
      height: isMediumScreen || isSmallScreen ? "100%" : "60%",
    }}
  >
    <Box
      component="img"
      src={actualImage || undefined}
      width="80%"
      height="100%"
      alt={product.name}
      sx={{ overflow: "hidden", }}
    />
  </Box>
  {/* <AddToFavButton product={product} /> */}
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    {product.imageURL?.map((image, index) => (
      <Box
        key={index}
        component="img"
        src={image}
        alt={`Imagen ${index + 1}`}
        sx={{
          width: "50px",
          marginRight: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          handleClickThumbnail(index), handleClickImage(image);
        }}
      />
    ))}
  </Box>
</Grid>

        <Grid item xs={12} sm={6}>
          <Typography sx={{
            mt: isMediumScreen ||  isMidScreen ? "10%" : "5%",
        }} variant="h4">{product.name}</Typography>
          <Divider sx={{ my: 2, width: "100%" }} />
          <Typography variant="body1" gutterBottom>
            Precio: ${product.price}
          </Typography>
          <Typography variant="body1" gutterBottom
          sx={{whiteSpace: "pre-wrap"}}>
            Descripción: {product.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              type="number"
              label="Cantidad"
              variant="outlined"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: product.stock }}
              sx={{ mr: 1, width: "50%" }}
            />
            {product.category.name === "Café" && (
              <FormControl variant="outlined" sx={{ width: "50%" }}>
                <Select
                  label="Molido"
                  value={selectedGrind}
                  onChange={handleGrindChange}
                >
                  <MenuItem value="Grano-default">Grano</MenuItem>
                  <MenuItem value="Método turco">Método turco</MenuItem>
                  <MenuItem value="Espresso">Espresso</MenuItem>
                  <MenuItem value="Aeropress">Aeropress</MenuItem>
                  <MenuItem value="V-60">V-60</MenuItem>
                  <MenuItem value="Chemex">Chemex</MenuItem>
                  <MenuItem value="Cafetéra eléctrica">Cafetéra eléctrica</MenuItem>
                  <MenuItem value="Prensa francesa">Prensa francesa</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <AddToCartButtom product={product} quantity={quantity} />
            <BuyButton product={product} quantity={quantity} />
          </Box>
        </Grid>
      </Grid>
    ) : (
      <CircularProgress />
    )}
  </Box>
  );
};

export default ProductDetail;
