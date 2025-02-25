import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { OrderState, UserState } from "@/commons/types.interface";
import { clearCart } from "@/redux/actions";

const Confirmation = () => {
  const user = useSelector((state: UserState) => state.user);
  const [order, setOrder] = useState<OrderState | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/order/${user._id}`,
          { method: "POST" }
        );

        if (!response.ok) {
          throw new Error("Error");
        }

        const orderData: OrderState = await response.json();
        setOrder(orderData);

        dispatch(clearCart(user._id));
      } catch (error) {
        console.log("Error fetching data:");
      }
    };

    fetchData();
  }, [user._id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 15,
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "40px", textAlign: "center" }}
      >
        ¡Gracias por tu pedido! Tu compra ha sido confirmada.
      </Typography>
      {order ? (
        <Box>
          <Typography variant="h6">Detalles</Typography>
          <Typography variant="body2">
            Llegará a la dirección: {order.shoppingData?.address}{" "}
            {order.shoppingData?.directionNum} {order.shoppingData?.apartment}
            &nbsp; - &nbsp; {order.shoppingData?.provincia} &nbsp;{" "}
            {order.shoppingData?.localidad}
          </Typography>
          <Typography variant="body2">
            Código de seguimiento: {order.trackingNumber}
          </Typography>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
      <Box sx={{ display: "flex", gap: "16px", py: 4 }}>
        <Link href="/order/history">
          <Button variant="outlined" color="primary" sx={{ color: "black" }}>
            Ver Historial de Pedidos
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Confirmation;
