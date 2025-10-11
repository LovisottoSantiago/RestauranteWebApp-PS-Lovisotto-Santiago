import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function getAllOrders() {
  const url = `${API_BASE_URL}${ENDPOINTS.orders}`; 

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener las órdenes");

    const data = await response.json();
    console.debug("[getAllOrders] Resultado:", data);
    return data;
  } catch (error) {
    console.error("[getAllOrders] Error:", error);
    throw error;
  }
}
