import { Cart } from "@/contexts/CartContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const postOrders = async (
  userId: number,
  token: string,
  cart: Cart[]
) => {
  const data = { userId, products: cart.map((item) => item.id) };

  try {
    const res = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!res.ok) {
      // Si la respuesta no fue exitosa (status fuera del 200–299)
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar la orden");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en postOrders:", error);
    // Podés lanzar el error nuevamente o manejarlo de otra forma
    throw error;
  }
};
