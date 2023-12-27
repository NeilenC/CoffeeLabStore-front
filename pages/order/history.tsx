import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { OrderState, UserState } from "../../commons/types.interface";

const Historial = () => {
  const user = useSelector((state: UserState) => state.user);
  const [orders, setOrders] = useState<OrderState[] | null>([]);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [cartData, setCartData] = useState<any[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/order/get-orders/${user._id}`,
          { method: "GET" },
        );

        if (!response.ok) {
          throw new Error("Error");
        }

        const orderData = await response.json();

        setOrders(orderData);

        if (orderData.cartId && orderData.cartId.length > 0) {
          const allCartIds = orderData.cartId.map((cart: any) => cart._id);
          setCartIds(allCartIds);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user._id]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const cartRequests = cartIds.map(async (cartId) => {
          const response = await fetch(
            `http://localhost:8000/cart/${cartId}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error("Error");
          }

          return response.json();
        });

        const cartData = await Promise.all(cartRequests);

        console.log("cartData:", cartData);
        setCartData(cartData);
      } catch (error) {
        console.log("Error fetching cart data:", error);
      }
    };

    if (cartIds.length > 0) {
      getCart();
    }
  }, [cartIds, user._id]);
  console.log("cartData:", cartData);

  return (
    <Box>
      {orders && cartData ? (
        orders.map((order: OrderState, index: number) => (
          <Box key={index}>
            <p>Orden {index + 1}</p>
            <p>Fecha de Creación: {order.createdAt}</p>
            <p>Total de la Orden: {order.totalCart}</p>
            <p>Detalles del Carrito:</p>
            {cartData[index] && (
              <Box>
                <p>Nombre del Producto: {cartData[index].nombre}</p>
                <p>Cantidad: {cartData[index].product}</p>
              </Box>
            )}
          </Box>
        ))
      ) : (
        <p>No hay órdenes disponibles.</p>
      )}
    </Box>
  );
};

export default Historial;
