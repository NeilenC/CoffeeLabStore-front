import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CartState, OrderState, Product, UserState } from "../../commons/types.interface";
import { RepeatOneSharp } from "@mui/icons-material";
import ProductDetails from "@/commons/ProductInOrder";
import NotFound from "@/commons/NotFound";

const Historial = () => {
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const [orders, setOrders] = useState<OrderState[]>([]);
  const [cartIds, setCartIds] = useState<string[]>([])
  const [productsId, setProductsId] = useState<any[]>([]);
  const cartDetails = orders?.map((item:any) => item.cartDetails)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/order/get-orders/${userId}`,
          { method: "GET" },
        );
  
        if (!response.ok) {
          throw new Error("Error");
        }
  
        const orderData = await response.json();
       setOrders(orderData)

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userId]);
  

  return (
    <Box sx={{ m: 10, height:"51vh" }}>
  {orders.length > 0 && orders.length > 0 ? (
  orders.map((order, index) => (
    <Box key={index} sx={{ marginBottom: 4 , p:3, borderRadius:"8px", boxShadow:"0px 0px 15px -3px lightgrey"}}>
      <Typography variant="h6">Orden {index + 1}</Typography>
      <Typography variant="body2">Creada el día: {new Date(order.createdAt).toLocaleString()}</Typography>
      <Typography variant="body2">Número de seguimiento: {order.trackingNumber} </Typography> 
      <Typography variant="body2">Total compra: $ {order.cartTotal}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap",my: 2}}>
        {order && order.cartDetails.map((item:any, index: any) => (
          <Box key={index} sx={{  width: "15%",  m:"auto" }}>
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
  );
};

export default Historial;
