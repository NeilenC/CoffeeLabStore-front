import { Category, Product, SubCategory } from '@/commons/types.interface';
import { Box, Grid, Card, CardContent, Typography, Button, Pagination } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddToCartButtom from '@/commons/AddToCartButtom';
import oslo1 from '../../public/oslo1.png'
import theme from '@/styles/theme';

function CategoryDetail() {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('')
  const [subCategory, setSubcategory] = useState<SubCategory[]>([])
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  

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
useEffect(()=> {
  const getSubCategory = async (categoryId:any) => {
      try{
    
        const response = await fetch(`http://localhost:8000/subcategory/${categoryId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if(response.ok) {
          setSubcategory(data)
        }
      }catch(e){
        throw new Error
      }
    }
    getSubCategory(categoryId)
  },[categoryId])

  useEffect(()=>{
    getProductsByCategory()
  },[products])

  useEffect(()=>{
    async function getCategory () {
      const categories = await fetch(`http://localhost:8000/categories/${categoryId}`,{method: "GET"})

      const data = await categories.json()
      setCategory(data.name)
    }
    getCategory()
  },[categoryId])

  return (
    <Box sx={{ display:"flex", px:4, py:2}}>
      
    <Box sx={{ width:"20%",}}>
      <Typography variant='h5' sx={{justifyContent:"center", p:4, fontWeight:"bold"}}>{category}</Typography>
      <Grid container spacing={2} sx={{ml:2}}>

        {subCategory.map((subcategory)=>(
          <Grid item xs={12} 
                key={subcategory._id} 
                sx={{
                '&:hover': {color: theme.palette.text.secondary, cursor:"pointer"},
                color: selectedSubCategory === subcategory.name ? "#DAA520" : "inherit"}}
                onClick={()=> {router.push(`/${categoryId}/${subcategory._id}`), setSelectedSubCategory(subcategory.name)}}
          >
           <Typography sx={{fontWeight:"bold"}}> {subcategory.name} </Typography>
          </Grid>
          ))}
      </Grid>
    </Box>
    <Grid container spacing={3}  sx={{display:"flex", pt:3, m:"auto"}}>
      <Box  sx={{}}>
      {selectedSubCategory == 'Oslo' ? 
      <Image
      alt='imageOslo'
      src={oslo1}
      height={100}
      width={1000}
      />
      : null}
      </Box>

      {products.length ? 
     ( <>
      {currentProducts.map((product) => {
        return (
          <Grid item key={product._id}  >
        <Box sx={{ bgcolor:"pink"}}>
        <Card sx={{ bgcolor:""}}>
        <Link href={`/products/${product._id}`}>

        <Image 
        src={product.imageURL[0]}
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
           <AddToCartButtom product={product}/>
          </CardContent>
        </Card>
        </Box>
      </Grid>
        )
      })
     }
     {products.length > productsPerPage && (
      <Grid container spacing={2} sx={{m:"auto", justifyContent:"center", mt:6, bgcolor:"#eeeeee", borderRadius:2,}}>
    <Pagination
      count={Math.ceil(products.length / productsPerPage)}
      page={currentPage}
      onChange={(event, value) => setCurrentPage(value)}
      sx={{p:1.5,}}
      />
      </Grid>
     )} </> )
      : 
      <Grid container key="no-products-message" sx={{width:"50%", m:"auto"}}>
        <Grid item xs={5} sm={5} spacing={3}>
       <Typography variant='h6' > Lo sentimos!</Typography>
       <Typography variant='body1'>No hay productos para esta categoría. </Typography>
       </Grid>
      </Grid>
      }
    </Grid>
    </Box>

  );
}

export default CategoryDetail;