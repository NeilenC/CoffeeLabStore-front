import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import Section1 from "../deliveryHome/section1";
import Section3 from "../deliveryHome/section3";
import { sendOrderToBackend } from "../deliveryHome/function";
import { useRouter } from "next/router";

const index = () => {
  const user = useSelector((state: UserState) => state.user);
  const [section, setSection] = useState(1);
  const deliveryCharge = 1500;
  const router = useRouter();

  // Datos de la sección 1 (Datos Personales)
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastname || "");
  const [dni, setDni] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");

  // Datos de la sección 3 (Metodo de Pago)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardSecurityCode, setCardSecurityCode] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");

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

        paymentData: {
          paymentMethod,
          cardNumber,
          deliveryCharge: deliveryCharge,
        },
      };

      await sendOrderToBackend(user._id, orderData, router);
    }

    return (
      <Box
        sx={{
          display: "flex",
          direction: "column",
          bgcolor: "#F5f5f5f5",
          p: 10,
        }}
      >
        <Box sx={{ m: "auto" }}>
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
              />
            )}

            {section === 2 && (
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
};
export default index;
