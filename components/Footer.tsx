import React from "react";
import { AppBar, Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaWhatsapp } from "react-icons/fa";  

const FooterAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  marginTop: "auto", 
}));

const ContainerWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Footer = () => {
  return (
    <FooterAppBar position="relative" sx={{ alignSelf: "flex-end" }}>
      <Box sx={{ bgcolor: "rgb(60, 60, 60)", }}>
        <ContainerWrapper>
          <Grid container spacing={2} sx={{ color: "white",  }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Información de contacto</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
               <FaWhatsapp />
                <Typography variant="body2" sx={{ml:1}}> <a href="https://wa.me/542216918419" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none" }}>
                    +54 221 6918419 
                  </a></Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{paddingTop:'50px'}}>© 2024 CoffeeLabStore.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Typography variant="h6">Enlaces útiles</Typography> */}
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Box>
    </FooterAppBar>
  );
};

export default Footer;
