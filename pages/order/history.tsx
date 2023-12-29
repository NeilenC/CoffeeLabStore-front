import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { OrderState, UserState } from "../../commons/types.interface";



const Historial = () => {
  const user = useSelector((state: UserState) => state.user);
  const [orders, setOrders] = useState<OrderState[]>([]);
  const [cartData, setCartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getCartData = async (cartIds: any) => {
    try {
      const cartRequests = cartIds.map(async (cartId: any) => {
        const response = await fetch(`http://localhost:8000/cart/${cartId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error');
        }

        return response.json();
      });

      return Promise.all(cartRequests);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/order/get-orders/${user._id}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error('Error');
        }

        const orderData: OrderState[] = await response.json();

        setOrders(orderData);

        const cartIds = orderData
          .map((order: any) => order.cartId?._id)
          .filter(Boolean);

        if (cartIds.length > 0) {
          const cartData = await getCartData(cartIds);
          setCartData(cartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);

  return (
    <Box sx={{ m: 10 }}>
      {orders.length > 0 && cartData.length > 0 ? (
        orders.map((order, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <p>Orden {index + 1}</p>
            <p>Fecha de Creación: {new Date(order.createdAt).toLocaleString()}</p>
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