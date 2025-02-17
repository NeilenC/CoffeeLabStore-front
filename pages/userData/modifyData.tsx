import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";
import { useRouter } from "next/router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type EditUserDataFormProps = {
  initialData: {
    email: "";
    phoneNumber: "";
    password: "";
  };
};

const EditUserDataForm: React.FC<EditUserDataFormProps> = ({ initialData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const router = useRouter();
  const handleChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const user = useSelector((state: UserState) => state);

  // ---------------------- PUT PARA MODIFICAR LOS DATOS ----------------------

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/${user.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData?.email,
          phoneNumber: formData?.phoneNumber,
          password: formData?.password,
        }),
      });

      if (response.ok) {
        toast.success("Cambios realizados con éxito" ,{
          autoClose: 1000, 
        });
        setFormData(initialData);
      }
    } catch (error) {
      toast.error("Hubo un error al procesar la solicitud" ,{
        autoClose: 1000, 
      });
    }
  };


  return (
    <Box>
      <Grid container spacing={2} sx={{ width: "35%", p: 5, m: "auto" }}>
        <Grid item xs={12}>
          <Typography variant="h5">
            MODIFICAR DATOS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InputLabel> Email </InputLabel>
          <TextField
            value={formData?.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel> Teléfono </InputLabel>
          <TextField
            value={formData?.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sx={{ pb: 3 }}>
      <InputLabel> Contraseña </InputLabel>
      <TextField
        type={showPassword ? "text" : "password"}
        value={formData?.password}
        onChange={(e) => handleChange("password", e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{mr:0.5, bgcolor:"lightgrey"}}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>


        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveClick}
            sx={{ p: 1.78 }}
          >
            Guardar
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              router.push("/");
            }}
            sx={{ p: 1.78 }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserDataForm;
