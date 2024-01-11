import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { OrderState, UserState } from "../../commons/types.interface";



const Historial = () => {
  const user = useSelector((state: UserState) => state.user);
  const [orders, setOrders] = useState<OrderState[]>([]);
  const [cartData, setCartData] = useState<any[]>([]);
  const [productsId, setProductsId] = useState<any[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartsByIds = async () => {
      try {
      const response = await fetch('http://localhost:8000/cart/get-by-ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartIds: cartData }),
      });

      if (response.ok) {
        const carts = await response.json();

        const cartArray = carts?.map((products:any) => products.cart)

        const productsIds =  cartArray[0].map((item:any) => item.productId)  

        setProductsId(productsIds)

      } else {
        console.error('Error al obtener carritos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  getCartsByIds()
},[])

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

        const cartsIdArray =  orderData.map((cart)=> cart.cartId)

        const cartsIds =  cartsIdArray.map((item) => item[0]._id)

        setCartData(cartsIds)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);


  useEffect(() => {
    const fetchProductsByIds = async () => {
      try {
        const url = 'http://localhost:8000/products/byIds';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds: productsId }),
        });
  
        const data = await response.json();
        console.log("DATA", data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProductsByIds();
  }, [productsId]);

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