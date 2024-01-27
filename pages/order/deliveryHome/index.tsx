import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import { useRouter } from "next/router";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import { sendOrderToBackend } from "./function";

const DeliveryHome = () => {
  const user = useSelector((state: UserState) => state.user);
  const cart = useSelector((state: CartState) => state.cart);
  const [section, setSection] = useState(1);
  const deliveryCharge = 1500;

  // Datos de la sección 1 (Datos Personales)
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastname || "");
  const [dni, setDni] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");

  // Datos de la sección 2 (Detalles de Envio)
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [directionNum, setDirectionNum] = useState("");
  const [codigo, setCodigo] = useState<number | null>(null);
  // const [provincia, setProvincia] = useState("");
  // const [localidad, setLocalidad] = useState("");

  // Datos de la sección 3 (Metodo de Pago)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardSecurityCode, setCardSecurityCode] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");

  const router = useRouter();

  const handleNextSection = () => {
    setSection(section + 1);
  };

  const handleGoBack = () => {
    setSection(section - 1);
  };

  const handlePlaceOrder = async () => {
    if (section === 1 && (!name || !email)) {
      console.error("Nombre y correo son obligatorios.");
      return;
    }

    if (section === 2 && (!address || !paymentMethod)) {
      console.error("La dirección y el método de pago son obligatorios.");
      return;
    }

    if (section === 3) {
      if (!paymentMethod) {
        console.error("El método de pago es obligatorio.");
        return;
      }

      if (
        paymentMethod === "tarjetaDebito" ||
        paymentMethod === "tarjetaCredito"
      ) {
        if (!cardNumber || !cardSecurityCode || !cardExpirationDate) {
          console.error("Por favor, complete todos los campos de la tarjeta.");
          return;
        }
      }

      const orderData = {
        userData: {
          name,
          lastName,
          dni,
          phoneNumber,
          email,
        },
        shoppingData: {
          address,
          apartment,
          directionNum,
          codigo,
          // provincia,
          // localidad,
        },
        paymentData: {
          paymentMethod,
          cardNumber,
          delivery: "domicilio",
          deliveryCharge: deliveryCharge,
        },
      };

      await sendOrderToBackend(user._id, orderData, router);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: 'center',
        m: 'auto',
        bgcolor: "#F5f5f5f5",
        px: 9,
        py:5,
        maxWidth: "70%",
      }}
    >
      <Box >
        {/* <LockIcon/>  */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{ fontSize: "20px", bgcolor: "white", p: 3, borderRadius: 5 }}
          >
            {" "}
            Tu compra es totalmente segura y confidencial{" "}
          </Box>
        </Box>
        {/* SECCION 1 */}
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 4 }}>
          {section === 1 && (
            <Section1
              name={name}
              setName={setName}
              lastName={lastName}
              setLastName={setLastName}
              dni={dni}
              setDni={setDni}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              handleNextSection={handleNextSection}
              handleGoBack={handleGoBack}
            />
          )}

          {/* SECCION 2 */}

          {section === 2 && (
            <Section2
              address={address}
              setAddress={setAddress}
              apartment={apartment}
              setApartment={setApartment}
              directionNum={directionNum}
              setDirectionNum={setDirectionNum}
              codigo={codigo}
              setCodigo={setCodigo}
              // localidad={localidad}
              // provincia={provincia}
              // setProvincia={setProvincia}
              // setLocalidad={setLocalidad}
              handleNextSection={handleNextSection}
              handleGoBack={handleGoBack}
            />
          )}

          {/* SECCION 3 */}
          {section === 3 && (
            <Section3
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardSecurityCode={cardSecurityCode}
              setCardSecurityCode={setCardSecurityCode}
              cardExpirationDate={cardExpirationDate}
              setCardExpirationDate={setCardExpirationDate}
              handlePlaceOrder={handlePlaceOrder}
              handleGoBack={handleGoBack}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryHome;
