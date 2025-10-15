import { getCart, clearCart } from "./utils/cartService.js";
import { createOrder } from "../../services/order/createOrder.js";
import { showToast } from "../toast/toast.js";
import { renderOrderConfirmation } from "./cartConfirmation.js";

export async function handleCheckout(checkoutData, section) {
  const cart = getCart();

  const orderData = {
    items: cart.map(i => ({
      id: i.id,
      quantity: i.quantity,
      notes: i.notes?.trim() || ""
    })),
    delivery: {
      id: checkoutData.deliveryTypeId,
      to: checkoutData.deliveryTypeId === 1
        ? (checkoutData.deliveryAddress?.trim() || "")
        : ""
    },
    notes: checkoutData.notes?.trim() || ""
  };

  try {
    showToast("Procesando pedido...", "info");
    const response = await createOrder(orderData);
    clearCart();

    const savedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    savedOrders.push(response.orderNumber);
    localStorage.setItem("userOrders", JSON.stringify(savedOrders));

    showToast(`Pedido confirmado (#${response.orderNumber})`, "success");
    renderOrderConfirmation(section, response);
  } catch (err) {
    console.error("handleCheckout:", err);
    showToast("Error al crear la orden. Intenta nuevamente.", "error");
  }
}
