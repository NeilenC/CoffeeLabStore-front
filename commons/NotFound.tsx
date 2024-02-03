import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'

const NotFound = ({children}: any) => {
  const router = useRouter();

  return (
      <Box
          sx={{
            bgcolor: "black",
            width: "70%",
            p: 8,
            m: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              m: "auto",
              fontSize: "25px",
              px: 5,
              mb: 3,
            }}
          >
           {children}
          </Typography>
          <Button
            sx={{ m: "auto" }}
            color="warning"
            onClick={() => {
              router.push("/");
            }}
          >
            Ir a inicio
          </Button>
      </Box>
  )
}

export default NotFound