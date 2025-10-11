import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function createOrder(orderData) {
  const url = `${API_BASE_URL}${ENDPOINTS.orders}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    // Intentar parsear el cuerpo una sola vez
    const rawText = await response.text();
    console.log("Raw response:", rawText);

    let data = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.warn("Respuesta no es JSON, se trata como texto plano.");
    }

    if (!response.ok) {
      // Mensaje corto para el usuario
      const message =
        data?.message ||
        "Error al crear la orden. Verifica los datos ingresados.";
      console.error("Error de servidor:", rawText);
      throw new Error(message);
    }

    return data || {}; // si no hay JSON válido, devolver objeto vacío
  } catch (error) {
    console.error("createOrder error:", error);
    throw new Error("No se pudo crear la orden. Intenta nuevamente.");
  }
}
