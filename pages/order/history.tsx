import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { CartState, OrderState, UserState } from "../../commons/types.interface";
import ProductDetails from "@/commons/ProductInOrder";
import NotFound from "@/commons/NotFound";

const Historial = () => {
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const [orders, setOrders] = useState<OrderState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/order/get-orders/${userId}`,
          { method: "GET" }
        );

        if (!response.ok) throw new Error("Error al obtener órdenes");

        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F4F6F8", // Fondo más moderno
        p: 3,
      }}
    >
      <Box sx={{ flex: 1, maxWidth: "900px", margin: "auto", width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center",
        paddingTop:7,

         }}>
          Historial de Compras
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                p: 3,
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Orden #{index + 1}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Creada el: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Número de seguimiento: <b>{order.trackingNumber}</b>
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                Total: <b>${order.cartTotal}</b>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {order.cartDetails.map((item:any, idx:any) => (
                  <Box
                    key={idx}
                    sx={{
                      width: "100%",
                      maxWidth: "200px",
                      borderRadius: "8px",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <ProductDetails productId={item.productId} quantity={item.quantity} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        ) : (
          <NotFound>Aún no hay órdenes disponibles.</NotFound>
        )}
      </Box>
    </Box>
  );
};

export default Historial;
