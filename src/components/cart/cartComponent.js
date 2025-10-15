import { updateCartUI } from "./cartUI.js";
import { attachCartEvents } from "./cartEvents.js";

export function renderCart() {
  const section = document.createElement("section");
  section.classList.add("cart-view");
  section.innerHTML = `
    <header class="cart-header">
      <h1>Tu Orden</h1>      
      <button id="clear-cart-btn" class="btn-secondary">Limpiar orden</button>
    </header>
    <div id="cart-items" class="cart-items"></div>
    <div class="cart-summary">
      <div class="cart-total">
        <span>Total:</span>
        <span id="cart-total-amount">$0</span>
      </div>
      <button id="checkout-btn" class="btn-primary">Realizar pedido</button>
    </div>
  `;

  updateCartUI(section);
  attachCartEvents(section);
  return section;
}
