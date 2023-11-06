import { Category, Product } from '@/commons/types.interface';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function CategoryDetail() {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const [products, setProducts] = useState([])


  async function getProductsByCategory() {
    try{

      if(categoryId) {
      
        const response = await fetch(`http://localhost:8000/products/bySubCategory/${subCategoryId}`,{method:"GET"})
        const dataPromise: Promise<Product[]> = response.json();
        
        const data = await dataPromise; 
        
        if (data) {
          setProducts(data)
        }
      }
      }catch(e){
        console.log("error", e)
      }
    
    }


  useEffect(()=>{
    getProductsByCategory()
  },[products])

  return (
    <Grid container spacing={3} sx={{p:4}}>

      {products.map((product) => {
        return (
          <Grid item key={product._id}  >
        <Box sx={{ bgcolor:"pink"}}>
        <Card sx={{ bgcolor:""}}>
        <Link href={`/products/${product._id}`}>

        <Image 
        src={product.imageURL}
        width={300}
        height={300}
        alt={product.name}
        />
       
        </Link>
          <CardContent sx={{ bgcolor:"#FOFOFO ", borderTop:"1px solid lightgrey"}}>
            <Typography variant="body1" color="initial">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${product.price}
            </Typography>
            <Button
              // onClick={() => addItemToCart(product)}
              sx={{bgcolor:"back", width:"auto"}}
              variant="contained"
              color="primary"
              fullWidth
            >
              Agregar al carrito <ShoppingCartOutlinedIcon/>
            </Button>
          </CardContent>
        </Card>
        </Box>
      </Grid>
        )
      })}
    </Grid>
  );
}

export default CategoryDetail;