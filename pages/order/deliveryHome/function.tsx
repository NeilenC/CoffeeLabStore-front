export const sendOrderToBackend = async (
  userId: string,
  orderData: any,
  router: any,
) => {

  console.log("userId",userId)
  console.log("orderData",orderData)
  console.log("router",router)
  try {
    const response = await fetch(`${process.env.BASE_URL}/order/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      console.error(
        "Error al enviar la orden al backend:",
        response.statusText,
      );
      return;
    }

    const responseData = await response.json();
    console.log("Respuesta del backend:", responseData);

    router.push("/order/confirmation");
  } catch (error) {
    console.error("Error al enviar la orden al backend:", error);
  }
};
