import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function createOrder(orderData) {
  const url = `${API_BASE_URL}${ENDPOINTS.orders}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear la orden');
    }
    
    return await response.json();
  } catch (error) {
    console.error("createOrder:", error);
    throw error;
  }
}