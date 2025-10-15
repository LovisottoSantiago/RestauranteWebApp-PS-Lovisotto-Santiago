import { getCart, removeFromCart, getCartTotal, updateItemNotes, updateItemQuantity } from "./utils/cartService.js";
import { renderCartItem } from "./cartItem/cartItem.js";
import { showToast } from "../toast/toast.js";

export function updateCartUI(section) {
  const cart = getCart();
  const itemsContainer = section.querySelector("#cart-items");
  const totalElement = section.querySelector("#cart-total-amount");
  const checkoutBtn = section.querySelector("#checkout-btn");

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="empty-cart">Tu orden está vacía</p>';
    totalElement.textContent = "$0";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  itemsContainer.innerHTML = "";

  cart.forEach(item => {
    const itemEl = renderCartItem(
      item,
      id => { removeFromCart(id); updateCartUI(section); showToast("Plato eliminado", "info"); },
      (id, notes) => updateItemNotes(id, notes),
      (id, qty) => { updateItemQuantity(id, qty); totalElement.textContent = `$${getCartTotal().toFixed(2)}`; }
    );
    itemsContainer.appendChild(itemEl);
  });

  totalElement.textContent = `$${getCartTotal().toFixed(2)}`;
}
