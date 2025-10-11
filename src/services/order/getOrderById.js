import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function getOrderById(orderId) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}/${orderId}`);
  if (!res.ok) throw new Error(`Error obteniendo orden ${orderId}`);
  return res.json();
}
