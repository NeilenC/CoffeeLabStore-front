import React, { useState, useEffect } from 'react';
import { Grid, InputBase, IconButton, List, ListItem, ListItemText, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Product } from '@/commons/types.interface';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/products/search/${searchTerm}`, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (Array.isArray(data) && data.length > 0) {
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };
  
    if (searchTerm.trim() !== '') {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  
  function handleClickSearch (productId: string) {
    if(productId) {
      router.push(`/products/${productId}`) 
      setSearchResults([]);
      setSearchTerm('')
    }
  }
  

  return (
    <Grid item xs={5}>
    <InputBase
      sx={{
        bgcolor: "white",
        color: "black",
        width: "380px",
        px: 1.5,
        borderRadius: "50px",
        border: "1px solid lightgrey",
        position: 'relative',
        zIndex: 2,
      }}
      placeholder="Buscar..."
      value={searchTerm}
      inputProps={{ 'aria-label': 'Buscar' }}
      onChange={(e) => setSearchTerm(e.target.value)}
      endAdornment={
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      }
    />
  
    {/* Lista de resultados */}
    {searchResults.length > 0 && searchTerm.trim() !== '' && (
      <Box sx={{ overflowY: 'auto', width: "370px", position: 'absolute', top: '100%', zIndex: 1 }}>
        <List sx={{  bgcolor: theme.palette.primary.main }}>
          {searchResults?.map((product) => (
            <Grid container spacing={1} key={product._id} sx={{p:1}}> 
              <Grid 
              item sx={{
                '&:hover': {bgcolor:"#fac880", p:0.5, pr:2}, ml:1}}
                onClick={() => handleClickSearch(product._id)} >{product.name} </Grid>
            </Grid>
          ))}
        </List>
      </Box>
    )}
  </Grid>
  
  );
};

export default Search;

