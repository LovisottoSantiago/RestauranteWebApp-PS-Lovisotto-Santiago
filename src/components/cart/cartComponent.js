import { 
  getCart, removeFromCart, clearCart, getCartTotal, updateItemNotes, updateItemQuantity 
} from "./utils/cartService.js";
import { renderCartItem } from "./cartItem/cartItem.js";
import { renderCheckoutModal } from "../checkout/checkoutModal/checkoutModal.js";
import { createOrder } from "../../services/order/createOrder.js";
import { showToast } from "../toast/toast.js";

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

function updateCartUI(section) {
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
    const itemEl = renderCartItem(item,
      id => { removeFromCart(id); updateCartUI(section); showToast("Plato eliminado", "info"); },
      (id, notes) => updateItemNotes(id, notes),
      (id, qty) => { updateItemQuantity(id, qty); totalElement.textContent = `$${getCartTotal().toFixed(2)}`; }
    );
    itemsContainer.appendChild(itemEl);
  });

  totalElement.textContent = `$${getCartTotal().toFixed(2)}`;
}

function attachCartEvents(section) {
  section.querySelector("#clear-cart-btn")?.addEventListener("click", () => {
    if (confirm("¿Vaciar la orden?")) {
      clearCart();
      updateCartUI(section);
      showToast("Orden vaciada", "info");
    }
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

async function handleCheckout(checkoutData, section) {
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


function renderOrderConfirmation(section, order) {
  section.innerHTML = `
    <div class="confirmation-icon">✓</div>
    <h1>¡Pedido Confirmado!</h1>
    <div class="order-details">
      <p>Número de orden: <strong>#${order.orderNumber}</strong></p>
      <p>Total: <strong>$${order.totalAmount.toFixed(2)}</strong></p>
      <p>Realizado: ${new Date(order.createdAt).toLocaleString("es-AR")}</p>
    </div>
    <div class="confirmation-actions">
      <button id="back-to-menu" class="btn-primary">Volver al menú</button>
    </div>
  `;
  section.querySelector("#back-to-menu").addEventListener("click", () => {
    window.location.hash = "#menu";
  });
}
