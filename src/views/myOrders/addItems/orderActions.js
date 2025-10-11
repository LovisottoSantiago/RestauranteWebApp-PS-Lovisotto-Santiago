import { getOrderById } from "../../../services/order/getOrderById.js";
import { updateOrder } from "../../../services/order/updateOrder.js";
import { showToast } from "../../../components/toast/toast.js";

// agrega o incrementa un plato en la orden usando PUT directo
export async function addDishToOrder(dishId, overlay) {
  const orderId = overlay.querySelector("h2").textContent.match(/\d+/)?.[0];
  if (!orderId) return showToast("Error: no se pudo determinar la orden", "error");

  try {
    const current = await getOrderById(orderId);
    console.debug("[addDishToOrder] Orden actual:", current);

    const existing = current.items.find(i => i.dish.id === dishId);
    let updatedItems;

    if (existing) {
      // incrementa cantidad del item existente
      updatedItems = current.items.map(i => ({
        id: i.id, // id del orderItem
        quantity: i.dish.id === dishId ? i.quantity + 1 : i.quantity,
        notes: i.notes || "",
      }));
    } else {
      // agrega nuevo plato
      updatedItems = [
        ...current.items.map(i => ({
          id: i.id,
          quantity: i.quantity,
          notes: i.notes || "",
        })),
        { id: dishId, quantity: 1, notes: "" }, // el backend reconocerá si el id no pertenece a un item?
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
