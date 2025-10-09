import { 
  getCart, 
  removeFromCart, 
  clearCart, 
  getCartTotal,
  updateItemNotes
} from "../../components/cart/utils/cartService.js";
import { renderCartItem } from "../../components/cart/cartItem/cartItem.js";
import { renderCheckoutModal } from "../../components/checkout/checkoutModal/checkoutModal.js";
import { createOrder } from "../../services/order/createOrder.js";
import { showToast } from "../../components/toast/toast.js";

export function renderMyCart() {
  const container = document.getElementById("app");
  
  container.innerHTML = `
    <section class="cart-view">
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
    </section>
  `;

  renderCartItems();
  attachCartListeners();
}

function renderCartItems() {
  const cart = getCart();
  const itemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total-amount");
  const checkoutBtn = document.getElementById("checkout-btn");
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="empty-cart">Tu orden está vacía</p>';
    totalElement.textContent = '$0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }
  
  if (checkoutBtn) checkoutBtn.disabled = false;
  
  itemsContainer.innerHTML = '';
  cart.forEach(item => {
    const itemElement = renderCartItem(
      item, 
      (dishId) => {
        removeFromCart(dishId);
        renderCartItems();
        showToast('Plato eliminado de la orden', 'info');
      },
      (dishId, notes) => {  // ⬅️ Callback para actualizar notas
        updateItemNotes(dishId, notes);
      }
    );
    itemsContainer.appendChild(itemElement);
  });
  
  totalElement.textContent = `$${getCartTotal().toFixed(2)}`;
}

function attachCartListeners() {
  window.addEventListener('cartUpdated', () => {
    renderCartItems();
  });
  
  document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
    if (confirm('¿Seguro que deseas vaciar la orden?')) {
      clearCart();
      renderCartItems();
      showToast('Orden vaciada', 'info');
    }
  });
  
  document.getElementById('checkout-btn')?.addEventListener('click', async () => {
    const cart = getCart();
    
    if (cart.length === 0) {
      showToast('Tu orden está vacía', 'warning');
      return;
    }
    
    await renderCheckoutModal(
      async (checkoutData) => {
        await handleCheckout(checkoutData);
      },
      () => {
        console.log('Checkout cancelado');
      }
    );
  });
}

async function handleCheckout(checkoutData) {
  const cart = getCart();
  
  const orderData = {
    items: cart.map(item => ({
      id: item.id,
      quantity: item.quantity,
      notes: item.notes || null  // ⬅️ Las notas ya están guardadas
    })),
    delivery: {
      id: checkoutData.deliveryTypeId,
      to: checkoutData.deliveryAddress || null
    },
    notes: checkoutData.notes || null
  };
  
  try {
    showToast('Procesando tu pedido...', 'info', 2000);
    
    const response = await createOrder(orderData);
    
    clearCart();
    
    showToast(
      `¡Pedido confirmado! Número de orden: #${response.orderNumber}`,
      'success',
      5000
    );
    
    setTimeout(() => {
      renderOrderConfirmation(response);
    }, 2000);
    
  } catch (error) {
    showToast(
      `Error al crear la orden: ${error.message}`,
      'error',
      5000
    );
  }
}

function renderOrderConfirmation(orderData) {
  const container = document.getElementById("app");
  
  container.innerHTML = `
    <section class="order-confirmation">
      <div class="confirmation-icon">✓</div>
      <h1>¡Pedido Confirmado!</h1>
      <div class="order-details">
        <p class="order-number">Número de orden: <strong>#${orderData.orderNumber}</strong></p>
        <p class="order-total">Total: <strong>$${orderData.totalAmount.toFixed(2)}</strong></p>
        <p class="order-time">Realizado: ${new Date(orderData.createdAt).toLocaleString('es-AR')}</p>
      </div>
      <div class="confirmation-actions">
        <button id="back-to-menu" class="btn-primary">Volver al menú</button>
      </div>
    </section>
  `;
  
  document.getElementById('back-to-menu')?.addEventListener('click', () => {
    window.location.hash = '#menu';
  });
}