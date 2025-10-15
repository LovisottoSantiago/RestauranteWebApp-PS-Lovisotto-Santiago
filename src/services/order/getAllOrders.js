import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function getAllOrders(filters = {}) {
  const { from, to, status, includeClosed = false } = filters;
  const url = new URL(`${API_BASE_URL}${ENDPOINTS.orders}`);

  if (from) url.searchParams.append("from", from);
  if (to) url.searchParams.append("to", to);
  if (status) url.searchParams.append("status", status);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener las órdenes");
    const data = await response.json();
    
    const filtered = includeClosed
      ? data
      : data.filter(order => order.status.id !== 5);

    console.debug("[getAllOrders] Resultado filtrado:", filtered);
    return filtered;
  } catch (error) {
    console.error("[getAllOrders] Error:", error);
    throw error;
  }
}