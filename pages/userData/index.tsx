import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "@/commons/types.interface";
import { Box, Typography, Button, Divider, Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { SignalCellularNullOutlined } from "@mui/icons-material";

type ShippingData = {
  address: string;
  apartment: string;
  directionNum: string;
  codigo: string;
  localidad: string;
};

const UserData = () => {
  const userId = useSelector((state: any) => state.user._id);
  const [user, setUser] = useState<any>({ 
    user :{
      _id: '',
      name: '',
      lastName: '',
      email: '',
      address: '',
      role: '',
      phoneNumber: 0,
    } 
  })
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const isMediumScreen = useMediaQuery('(max-width: 1000px)')


  useEffect(() => {
    const storedShippingData = JSON.parse(
      localStorage.getItem("shippingData") || "{}",
    );
    setShippingData(storedShippingData);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/${userId}`, { method: "GET" });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Error al obtener los datos del usuario:", response.status);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
  
    getUserInfo();
  }, [userId]);

  const dataItems = [
    { label: "Nombre", value: `${user?.name} ${user?.lastName}`, buttonLabel: "Modificar" , href:'/userData/username'},
    { label: "Email", value: user?.email, buttonLabel: "Modificar", href:'/userData/email' },
    { label: "Teléfono", value: user?.phoneNumber, buttonLabel: "Modificar", href:'/userData/phoneNumber' },
    { label: "Contraseña", value: '*******', buttonLabel: "Modificar", href:'/userData/password' },
  ];

  return (
    <Box sx={{ height: "100%" }}>
    <Box
      sx={{
         bgcolor:"whitesmoke", 
         px:  isSmallScreen || isMediumScreen ? "2%" : "20%", 
         py: isSmallScreen || isMediumScreen ? "12%":"5%",
        maxWidth: "80%", m:"auto"
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Datos personales
      </Typography>
      {dataItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid lightgrey",
            borderRadius: 2,
            padding: 2,
            marginBottom: 2,
            marginLeft: 0, 
            boxShadow:"0px 0px 12px -10px black",
            bgcolor:"white"
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ my: "auto", textAlign: "left", ml:1}}>
              <Typography >
                <strong>{item.label}:</strong> {item.value}
              </Typography>
            </Grid>
            {item.buttonLabel && (
              <Grid item xs={5} sx={{ textAlign: "right" }}>
                <Button onClick={() => router.push(`/${item.href}`)}>{item.buttonLabel}</Button>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}
    </Box>
  </Box>
  );
};

export default UserData;