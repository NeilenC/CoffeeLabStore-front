import ProductsCard from '@/commons/ProductsCard';
import { Product } from '@/commons/types.interface';
import { searchProducts } from '@/functions';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const searchResults = () => {
const router = useRouter()
const [searchResults, setSearchResults] = useState<Product[]>([]);
const  searchTerm  =  router.query.searchTerm

console.log("searchResults",  searchResults)

  useEffect(()=> {
    if(searchTerm) {
      searchProducts({searchTerm, setSearchResults})
    }
  },[searchTerm, searchResults])

  return (
    <Box sx={{p:5}}>
      {searchResults.length ?
      <>
      <Typography variant='h5' sx={{maxWidth: "1200px", m: "auto",}}> Estos son los resultados que coinciden con tu búsqueda:</Typography>
       <ProductsCard products={searchResults} />
      </>
      : 
      <Box>
       <Typography>Lo sentimos, no encontramos productos para tu búsqueda</Typography> 
      </Box> }
     
    </Box>
  )
}

export default searchResults