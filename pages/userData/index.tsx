import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "@/commons/types.interface";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
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
  const userId = useSelector((state: UserState) => state.user._id);
  const [user, setUser] = useState<UserState>({  
    user: {
    _id: '',
    name: '',
    lastName: '',
    email: '',
    address: '',
    role: '',
    phoneNumber: 0,
  },
  })
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedShippingData = JSON.parse(
      localStorage.getItem("shippingData") || "{}",
    );
    setShippingData(storedShippingData);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, { method: "GET" });
  
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
    {
      label: "Dirección",
      value: `${shippingData?.address} n° ${shippingData?.directionNum} ${shippingData?.apartment || ""}`,
      buttonLabel: "",
    },
    { label: "Contraseña", value: '*******', buttonLabel: "Modificar", href:'/userData/password' },
  ];

  return (
    <Box sx={{ height: "100%" }}>
    <Box
      sx={{
         bgcolor:"whitesmoke", px:"20%", py:"5%",
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