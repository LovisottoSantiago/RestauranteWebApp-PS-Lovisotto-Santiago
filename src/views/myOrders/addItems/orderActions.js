import { getOrderById } from "../../../services/order/getOrderById.js";
import { updateOrder } from "../../../services/order/updateOrder.js";
import { showToast } from "../../../components/toast/toast.js";

export async function addDishToOrder(dishId, overlay) {
  const orderId = overlay.querySelector("h2").textContent.match(/\d+/)?.[0];
  if (!orderId) return showToast("Error: no se pudo determinar la orden", "error");

  try {
    const current = await getOrderById(orderId);
    console.debug("[addDishToOrder] Orden actual:", current);

    const existing = current.items.find(i => i.dish.id === dishId);
    let updatedItems;

    if (existing) {
      updatedItems = current.items.map(i => ({
        id: i.id, 
        quantity: i.dish.id === dishId ? i.quantity + 1 : i.quantity,
        notes: i.notes || "",
      }));
    } else {      
      updatedItems = [
        ...current.items.map(i => ({
          id: i.id,
          quantity: i.quantity,
          notes: i.notes || "",
        })),
        { id: dishId, quantity: 1, notes: "" }, 
      ];
    }

    console.debug("[addDishToOrder] PUT body:", updatedItems);

    await updateOrder(orderId, { items: updatedItems });
    showToast("Plato agregado correctamente", "success");
  } catch (err) {
    console.error("[addDishToOrder] Error:", err);
    showToast("No se pudo agregar el plato", "error");
  }
}
