let order = [];

export function renderOrderPanel(container) {
  container.innerHTML = `
    <aside class="order-panel">
      <div class="order-wrapper">
        <h2>Mi Orden</h2>
        <div class="order-items"></div>
        <div class="order-summary">
          <p>Total: <strong id="order-total">$0</strong></p>
          <button id="checkout-btn" disabled>Finalizar pedido</button>
        </div>
      </div>
    </aside>
  `;
  updateOrderUI();
}

export function addToOrder(dish) {
  const existing = order.find(item => item.id === dish.id);
  if (existing) {
    existing.qty++;
  } else {
    order.push({ ...dish, qty: 1 });
  }
  updateOrderUI();
}

function removeFromOrder(dishId) {
  order = order.filter(item => item.id !== dishId);
  updateOrderUI();
}

function changeQty(dishId, newQty) {
  const item = order.find(i => i.id === dishId);
  if (!item) return;
  if (newQty <= 0) {
    removeFromOrder(dishId);
  } else {
    item.qty = newQty;
  }
  updateOrderUI();
}

function updateOrderUI() {
  const itemsContainer = document.querySelector(".order-items");
  const totalElement = document.querySelector("#order-total");
  const checkoutBtn = document.querySelector("#checkout-btn");

  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";
  let total = 0;

  order.forEach(item => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "order-item";
    row.innerHTML = `
      <span class="order-name">${item.name}</span>
      <div class="order-controls">
        <input type="number" class="qty-input" min="0" value="${item.qty}">
        <span class="order-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-btn">x</button>
      </div>
    `;

    // Input cantidad
    row.querySelector(".qty-input").addEventListener("input", (e) => {
      const newQty = parseInt(e.target.value, 10);
      changeQty(item.id, isNaN(newQty) ? 0 : newQty);
    });

    // Botón eliminar
    row.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromOrder(item.id);
    });

    itemsContainer.appendChild(row);
  });

  totalElement.textContent = `$${total.toFixed(2)}`;
  checkoutBtn.disabled = order.length === 0;
}
