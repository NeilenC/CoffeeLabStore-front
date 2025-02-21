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
import { fetchProductDetails } from "@/functionsFetch";

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
    null
  );
  const itemsPerPage = 3;
  const isMediumScreen = useMediaQuery("(max-width: 950px)");
  const isMinScreen = useMediaQuery("(max-width: 400)");
  const isMidScreen = useMediaQuery("(max-width: 800px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };

  const handleGrindChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
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
      fetchProductDetails({ productId, setProduct });
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
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pt: !isMediumScreen || !isMidScreen ? "3%" : "10%",
        alignItems: "center",
      }}
    >
      {product ? (
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              maxWidth: "90%",
              m: "auto",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {product.imageURL?.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  sx={{
                    width: "50px",
                    pt: 1,
                    marginRight: 1.5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClickThumbnail(index), handleClickImage(image);
                  }}
                />
              ))}
            </Box>
            <Box
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
              sx={{
                overflow: "hidden",
                transform: isImageHovered ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: isMediumScreen || isSmallScreen ? "100%" : "80%",
                height: isMediumScreen || isSmallScreen ? "250px" : "300px",
              }}
            >
              <Box
                component="img"
                src={actualImage || undefined}
                alt={product.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* <AddToFavButton product={product} /> */}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                mt: isMediumScreen || isMidScreen ? "10%" : "5%",
                fontWeight: 600, // Agregar un peso de fuente para destacar el nombre
                color: "text.primary", // Usar el color del tema para consistencia
              }}
              variant="h4"
            >
              {product.name}
            </Typography>

            <Divider
              sx={{
                my: 3, // Aumentar el margen vertical para más espacio
                width: "100%",
                borderColor: "divider", // Usar el color del tema para consistencia
              }}
            />

            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary" }} // Destacar el texto con un peso y color
            >
              Precio: ${product.price}
            </Typography>

            <Typography
              variant="body1"
              gutterBottom
              sx={{ whiteSpace: "pre-wrap", color: "text.primary" }} // Mantener consistencia en el color
            >
              Descripción: {product.description}
            </Typography>

            <Typography
              variant="body1"
              gutterBottom
              sx={{ whiteSpace: "pre-wrap", color: "text.primary" }}
            >
              Cantidad disponible: {product.stock}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                  mb: 2, 
                }}
              >
                <TextField
                  type="number"
                  label="Cantidad"
                  variant="outlined"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1, max: product.stock }}
                  sx={{
                    mr: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
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
                    <MenuItem value="Cafetéra eléctrica">
                      Cafetéra eléctrica
                    </MenuItem>
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
