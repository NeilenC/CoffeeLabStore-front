import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Product } from "@/commons/types.interface";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import { searchProducts } from "@/FetchFunctions/productsFetch";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(true);
  const router = useRouter();
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const isMediumScreen = useMediaQuery('(max-width: 1000px)')
  const isSmallScreen = useMediaQuery('(max-width: 800px)')

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      searchProducts({ searchTerm, setSearchResults });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  function handleClickSearch(productId: string) {
    if (productId) {
      router.push(`/products/${productId}`);
      setSearchResults([]);
      setSearchTerm("");
      setShowResults(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target) &&
        searchTerm &&
        showResults
      ) {
        setSearchResults([]);
        setShowResults(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [searchContainerRef, searchTerm, showResults, timerId]);

  const handleMouseEnter = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProducts({ searchTerm, setSearchResults });
      router.push(`/search/${searchTerm}`);
      setShowResults(false);
      setSearchTerm("");
    } else {
      setShowResults(true);
    }
  };

  return (
    <Grid item  xs={isSmallScreen ? 8 : 5} ref={searchContainerRef}>
      <InputBase
        sx={{
          bgcolor: "white",
          color: "black",
          width:  isSmallScreen || isMediumScreen ? "150px" : "380px",
          px: 1.5,
          borderRadius: "50px",
          border: "1px solid lightgrey",
          position: "relative",
          zIndex: 2,
        }}
        placeholder="Buscar"
        value={searchTerm}
        inputProps={{ "aria-label": "Buscar" }}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        endAdornment={
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        }
      />

      {/* Lista de resultados */}
      {searchResults.length > 0 && searchTerm.trim() !== "" && (
        <Box
          sx={{
            overflowY: "auto",
            width: isSmallScreen ? "200px" : "370px",
            position: "absolute",
            top: "100%",
            zIndex: 1,
            visibility:
              searchResults.length > 0 && searchTerm.trim() !== ""
                ? "visible"
                : "hidden",
            height:
              searchResults.length > 0 && searchTerm.trim() !== ""
                ? "auto"
                : "0",
            transition: "height 0.3s",
          }}
          onMouseEnter={handleMouseEnter}
        >
          {showResults &&
            searchResults?.map((product) => (
              <List sx={{ bgcolor: theme.palette.primary.main }}>
                <Grid container spacing={1} key={product._id} sx={{ p: 1 }}>
                  <Grid
                    item
                    sx={{
                      "&:hover": { bgcolor: "#fac880", p: 0.5, pr: 2 },
                      ml: 1,
                    }}
                    onClick={() => handleClickSearch(product._id)}
                  >
                    {product.name}{" "}
                  </Grid>
                </Grid>
              </List>
            ))}
        </Box>
      )}
    </Grid>
  );
};

export default Search;
