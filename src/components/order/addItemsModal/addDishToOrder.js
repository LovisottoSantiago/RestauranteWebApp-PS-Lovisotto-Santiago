import { updateOrder } from "../../../services/order/updateOrder.js";
import { showToast } from "../../toast/toast.js";

export async function addDishToOrder(dishId, overlay) {
  const orderId = overlay.querySelector("h2").textContent.match(/\d+/)?.[0];
  if (!orderId) return showToast("Error: no se pudo determinar la orden", "error");

  try {
    // construir payload correctamente
    const payload = {
      items: [
        {
          id: dishId,
          quantity: 1,
          notes: ""
        }
      ]
    };

    await updateOrder(orderId, payload);
    showToast("Plato agregado correctamente", "success");
  } catch (err) {
    console.error("Error al agregar plato:", err);
    showToast("Error al agregar el plato", "error");
  }
}
