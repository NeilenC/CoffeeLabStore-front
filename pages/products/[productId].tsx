import { Box, Button, CardMedia, Divider, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Product } from '@/commons/types.interface';
  
const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1); // Inicializamos la cantidad en 1
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isImageHovered, setIsImageHovered] = useState(false);


  // Función para manejar el cambio de la cantidad
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity); // Asegurarse de que sea un número válido
  };

  const handleAddToCart = () => {
    if (product && quantity <= product.stock) {
      // Crear un nuevo objeto que representa el producto en el carrito
      const itemInCart = { product, quantity };

      // Agregar el producto al carrito
      setCart([...cart, itemInCart]);

      // Restablecer la cantidad a 1 
      setQuantity(1);

      console.log(`Agregado al carrito: ${quantity} x ${product.name}`);
    } else {
      console.error('No se puede agregar al carrito: cantidad excede el stock');
    }
  };


  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`http://localhost:8000/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!product) {
    return <>Cargando...</>;
  }

  const handleImageHover = () => {
    setIsImageHovered(true);
  };

  const handleImageLeave = () => {
    setIsImageHovered(false);
  };
  return (
    <Box sx={{p:5, display:"flex"}}>
        <Grid container spacing={1} sx={{m:"auto"}}>
            <Grid item xs={4} sx={{m:"auto"}}>
            <Box
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            sx={{
                overflow: 'hidden',
              transform: isImageHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src={product.imageURL}
              width={600}
              height={650}
              alt={product.name}
            />
          </Box>
            </Grid>
        <Grid item xs={5} sx={{my:"100px"}}>

        <Typography variant="h4" >{product.name}</Typography>
        <Divider sx={{my:3, color:"black"}}/>
            <Typography variant="body1" >Precio: ${product.price}</Typography>
            <Typography variant="body1" >Descripción: {product.description}</Typography>
            <Typography variant="body1" >Stock: {product.stock}</Typography>
            <Box sx={{py:3}}>
            <TextField
              type="number"
              label="Cantidad"
              variant="outlined"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: product.stock }}
            />
             </Box>
             <Box>

            <Button
            onClick={handleAddToCart}
            sx={{color:"black", p:2}}
            variant="contained"
            >
              Agregar al carrito <ShoppingCartOutlinedIcon/>
            </Button>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
};

export default ProductDetail;
