import { getOrderById } from "../../../services/order/getOrderById.js";
import { updateOrder } from "../../../services/order/updateOrder.js";
import { showToast } from "../../toast/toast.js";

/**
 * Agrega un plato o incrementa su cantidad si ya existe.
 */
export async function addDishToOrder(dishId, overlay) {
  const orderId = overlay.querySelector("h2").textContent.match(/\d+/)?.[0];
  if (!orderId) return showToast("Error: no se pudo determinar la orden", "error");

  try {
    const currentOrder = await getOrderById(orderId);
    const items = currentOrder.items || [];

    const existing = items.find(i => i.dish.id === dishId || i.id === dishId);
    let updatedItems;

    if (existing) {
      updatedItems = items.map(i =>
        i.dish.id === dishId || i.id === dishId
          ? { id: dishId, quantity: i.quantity + 1, notes: i.notes || "" }
          : { id: i.dish?.id || i.id, quantity: i.quantity, notes: i.notes || "" }
      );
    } else {
      updatedItems = [
        ...items.map(i => ({
          id: i.dish?.id || i.id,
          quantity: i.quantity,
          notes: i.notes || ""
        })),
        { id: dishId, quantity: 1, notes: "" }
      ];
    }

    await updateOrder(orderId, { items: updatedItems });
    showToast(existing ? "Cantidad actualizada" : "Plato agregado correctamente", "success");

  } catch (err) {
    console.error("Error en addDishToOrder:", err);
    showToast("Error al agregar el plato", "error");
  }
}
