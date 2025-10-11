import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";
import { showToast } from "../../components/toast/toast.js";
import { openAddItemsModal } from "./addItems/addItemsModal.js";

export async function renderOrderDetail(orderId) {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="order-detail-view">
      <header class="order-detail-header">
        <h1>Detalle de Orden #${orderId}</h1>
        <button id="back-btn" class="btn-secondary">Volver</button>
      </header>
      <div id="order-content" class="order-content">
        <p>Cargando orden...</p>
      </div>
    </section>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.hash = "#/myOrders";
  });

  try {
    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}/${orderId}`);
    if (!res.ok) throw new Error("No se pudo obtener la orden");
    const order = await res.json();
    renderOrder(order, container);
  } catch (err) {
    console.error(err);
    showToast("Error al cargar la orden", "error");
  }
}

function renderOrder(order, container) {
  const content = container.querySelector("#order-content");

  const itemsHTML = order.items.map(i => `
    <div class="order-item">
      <img src="${i.dish.image || 'https://via.placeholder.com/80'}" alt="${i.dish.name}">
      <div class="item-info">
        <h3>${i.dish.name}</h3>
        <p>${i.notes || ""}</p>
        <p>Cantidad: ${i.quantity}</p>
        <p>Estado: ${i.status.name}</p>
      </div>
    </div>
  `).join("");

  const isEditable = order.status.id !== 4 && order.status.id !== 5;

  content.innerHTML = `
    <div class="order-summary">
      <p><strong>Estado:</strong> ${order.status.name}</p>
      <p><strong>Total:</strong> $${order.totalAmount.toFixed(2)}</p>
      <p><strong>Tipo de entrega:</strong> ${order.deliveryType.name}</p>
      ${order.deliveryTo ? `<p><strong>Dirección:</strong> ${order.deliveryTo}</p>` : ""}
    </div>

    <div class="order-items">
      <h2>Platos de la orden</h2>
      ${itemsHTML}
    </div>

    <div class="order-actions">
      ${isEditable 
        ? `<button id="add-items-btn" class="btn-primary">Agregar más platos</button>`
        : `<p class="locked-msg">Esta orden ya no puede modificarse (${order.status.name}).</p>`}
    </div>
  `;

  if (isEditable) attachOrderEvents(order.orderNumber, content);
}

function attachOrderEvents(orderNumber, content) {
  const addBtn = content.querySelector("#add-items-btn");
  addBtn.addEventListener("click", () => openAddItemsModal(orderNumber));
}