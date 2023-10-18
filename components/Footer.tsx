import React from 'react';
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  marginTop: 'auto', // Para que el pie de página se ajuste justo debajo del contenido
}));

const ContainerWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Footer = () => {
  return (
    <FooterAppBar position="static">
      <ContainerWrapper>
        <Grid container spacing={2} sx={{color:"black"}}>
          <Grid item xs={12} sm={6} >
            <Typography variant="h6">Información de contacto</Typography>
            {/* Agrega aquí la información de contacto */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Enlaces útiles</Typography>
            {/* Agrega aquí los enlaces útiles */}
          </Grid>
        </Grid>
      </ContainerWrapper>
    </FooterAppBar>
  );
};

export default Footer;
