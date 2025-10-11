import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function updateOrder(orderId, payload) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error ${res.status}`);
  }

  return res.json().catch(() => ({}));
}
