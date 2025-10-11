import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function updateOrderItemStatus(orderId, itemId, newStatus) {
  const url = `${API_BASE_URL}${ENDPOINTS.orders}/${orderId}/item/${itemId}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = data?.message || "Error al actualizar estado del item";
      throw new Error(message);
    }

    return data;
  } catch (err) {
    console.error("[updateOrderItemStatus]", err);
    throw err;
  }
}
