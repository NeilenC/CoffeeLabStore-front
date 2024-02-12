import React, { useEffect, useState } from "react";
import { Typography, Grid, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";

  const Section2 = ({
    handleGoBack,
    address,
    setAddress,
    apartment,
    setApartment,
    directionNum,
    setDirectionNum,
    codigo,
    setCodigo,
    provincia,
    setProvincia,
    localidad,
    setLocalidad,
    handleNextSection,
  }: any) => {
    const user = useSelector((state: UserState) => state.user);
    const [addressError, setAddressError] = useState(false);
    const [directionNumError, setDirectionNumError] = useState(false);
    const [codigoError, setCodigoError] = useState(false);
    const [provinciaError, setProvinciaError] = useState(false);
    const [localidadError, setLocalidadError] = useState(false);
    const [provincias, setProvincias] = useState<string[]>([]);
    // const [selectedProvincia, setSelectedProvincia] = useState<string[]>([]);
    const [localidades, setLocalidades] = useState<string[]>([]);
    // const [selectedLocalidad, setSelectedLocalidad] = useState('');


    const handleSaveToLocalStorage = () => {
      const shippingData = {
        address,
        apartment,
        directionNum,
        codigo,
        provincia,
        localidad,
      };
      localStorage.setItem("shippingData", JSON.stringify(shippingData));
    };

    useEffect(() => {
      const shippingData = JSON.parse(
        localStorage.getItem("shippingData") || "{}",
      );
      const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");

      if (storedUserData.name !== user.name) {
        setAddress(shippingData.address || '');
        setApartment(shippingData.apartment || '');
        setDirectionNum(shippingData.directionNum || '');
        setCodigo(shippingData.codigo || '');
        setLocalidad(shippingData.localidad || '');
        setProvincia(shippingData.provincia || '');
      }
    }, []);

    const validateFields = () => {
      // Validar campos y establecer estados de error
      setAddressError(!address);
      setDirectionNumError(!directionNum);
      setCodigoError(!codigo);
      setProvinciaError(!provincias);
      setLocalidadError(!localidades);

      // Devolver verdadero si todos los campos obligatorios están completos
      return address && directionNum && codigo && provincias && localidades;
    };
    
    
    useEffect(() => {
      const fetchProvincias = async () => {
        try {
          const response = await fetch(
          "https://apis.datos.gob.ar/georef/api/provincias",
          {method:"GET"}
        );

        const data = await response.json();

        setProvincias(data.provincias);
      } catch (error) {
        console.error("Error al obtener la lista de provincias:", error);
      }
    };
    fetchProvincias();
  }, []);
    
      useEffect(() => {
        if (provincias && provincias.length) {
          const fetchLocalidades = async () => {
            try {
          const response = await fetch(
            `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provincia}&max=75`
        , 
        {method: "GET"}
          );
          const data = await response.json();
          setLocalidades(data.departamentos)
      } catch (error) {
        console.error("Error al obtener la lista de localidades:", error);
      }
    };
    fetchLocalidades();
  }
  }, [provincia, provincias]);
    
    return (
      <Box>
        <Box
          sx={{ color: "black", cursor: "pointer", py: 2 }}
          onClick={handleGoBack}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h5" gutterBottom>
          Detalles de envío
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8} md={4}>
            <TextField
              label="Calle"
              fullWidth
              value={address}
              style={{ marginBottom: "16px" }}
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressError(false);
              }}
              error={addressError}
              helperText={addressError && "Este campo es obligatorio"}
              required
            />
          </Grid>
          <Grid item xs={2} md={4}>
            <TextField
              label="Número"
              value={directionNum}
              fullWidth
              style={{ marginBottom: "16px" }}
              onChange={(e) => {setDirectionNum(e.target.value)
              setDirectionNumError(false)
            }}
            error={directionNumError}
            helperText={directionNumError && "Este campo es obligatorio"}
            required
            />
          </Grid>
          <Grid item xs={5} md={4}>
            <TextField
              label="Departamento (opcional)"
              value={apartment}
              fullWidth
              style={{ marginBottom: "16px" }}
              onChange={(e) => setApartment(e.target.value)}
            />
          </Grid>
          <Grid item xs={5} md={4}>
            <TextField
              label="Código postal"
              value={codigo}
              fullWidth
              style={{ marginBottom: "16px" }}
              onChange={(e) => {setCodigo(parseInt(e.target.value, 10))
              setCodigoError(false)
            }}
            error={codigoError}
            helperText={codigoError && "Este campo es obligatorio"}
            required
            />
          </Grid>
          <Grid item xs={5} md={4}>
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <Select
              value={provincia}
              onChange={(e) => {
                const selectedValue = e.target.value as string;
                setProvincia(selectedValue);
                setProvinciaError(false);
              }}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                {provincia ? provincia : "Provincia"}
              </MenuItem>
              {provincias && provincias.length
                ? provincias
                    .filter((prov: any) =>
                      ["Buenos Aires", "Ciudad Autónoma de Buenos Aires", "Córdoba", "Santa Fe", "La Pampa"].includes(prov.nombre)
                    )
                    .map((prov: any) => (
                      <MenuItem key={prov.id} value={prov.nombre}>
                        {prov.nombre}
                      </MenuItem>
                    ))
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5} md={4}>
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <Select
              value={localidad}
              onChange={(e) => {
                const selectedValue = e.target.value as string;
                setLocalidad(selectedValue);
                setLocalidadError(false);
              }}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                {localidad ? localidad : "Localidad"}
              </MenuItem>
              {localidades && localidades.length
                ? localidades.map((loc:any) => (
                    <MenuItem key={loc.id} value={loc.nombre}>
                      {loc.nombre}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Grid>

        </Grid>
        <Button
          onClick={() => {
            if (validateFields()) {
              handleNextSection();
              handleSaveToLocalStorage();
            }
          }}
          sx={{ color: "black" }}
        >
          Siguiente
        </Button>
      </Box>
    );
  };

  export default Section2;
