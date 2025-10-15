import { clearCart, getCart } from "./utils/cartService.js";
import { updateCartUI } from "./cartUI.js";
import { renderCheckoutModal } from "../checkout/checkoutModal/checkoutModal.js";
import { handleCheckout } from "./cartCheckout.js";
import { showToast } from "../toast/toast.js";
import { showConfirmModal } from "../confirmModal/confirmModal.js";

export function attachCartEvents(section) {
  section.querySelector("#clear-cart-btn")?.addEventListener("click", () => {
    showConfirmModal("¿Vaciar la orden?", () => {
      clearCart();
      updateCartUI(section);
      showToast("Orden vaciada", "info");
    });
  });

  section.querySelector("#checkout-btn")?.addEventListener("click", async () => {
    const cart = getCart();
    if (cart.length === 0) return showToast("Tu orden está vacía", "warning");

    await renderCheckoutModal(
      async data => await handleCheckout(data, section),
      () => console.log("Checkout cancelado")
    );
  });

  window.addEventListener("cartUpdated", () => updateCartUI(section));
}
