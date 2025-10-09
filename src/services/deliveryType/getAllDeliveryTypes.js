import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function getAllDeliveryTypes() {
  const url = `${API_BASE_URL}${ENDPOINTS.deliveryTypes}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error cargando tipos de entrega");
    return await response.json();
  } catch (error) {
    console.error("getAllDeliveryTypes:", error);
    return [];
  }
}