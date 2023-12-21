import React from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
const FooterAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  marginTop: "auto", // Para que el pie de página se ajuste justo debajo del contenido
}));

const ContainerWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Footer = () => {
  return (
    <FooterAppBar position="static">
      <Box sx={{ bgcolor: "black", heigth: "50%" }}>
        <ContainerWrapper>
          <Grid container spacing={2} sx={{ color: "white", m: "auto" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Información de contacto</Typography>
              <Typography
                variant="body2"
                sx={{ "&:hover": { color: "#DAA520" } }}
              >
                <CallIcon />
                +54 221 6918419
              </Typography>
              <Typography
                variant="body2"
                sx={{ "&:hover": { color: "#DAA520" } }}
              >
                <EmailIcon /> coffeelab@store.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Enlaces útiles</Typography>
              {/* Agrega aquí los enlaces útiles */}
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Box>
    </FooterAppBar>
  );
};

export default Footer;
