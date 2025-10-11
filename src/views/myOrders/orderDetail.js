import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";
import { updateOrder } from "../../services/order/updateOrder.js";
import { showToast } from "../../components/toast/toast.js";
import { openAddItemsModal } from "./addItems/addItemsModal.js";
import { renderOrderItem } from "../../components/order/orderItem/orderItem.js";

let orderState = null;

export async function renderOrderDetail(orderId) {
  const container = document.getElementById("app");

  container.innerHTML = `
    <section class="order-detail-view">
      <header class="order-detail-header">
        <h1>Detalle de Orden #${orderId}</h1>
        <div class="order-header-actions">
          <button id="back-btn" class="btn-secondary">Volver</button>
          <button id="add-items-btn" class="btn-primary">Agregar platos</button>
          <button id="confirm-btn" class="btn-success">Confirmar cambios</button>
        </div>
      </header>
      <div id="order-content" class="order-content">
        <p>Cargando orden...</p>
      </div>
    </section>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.hash = "#/myOrders";
  });

  document.getElementById("add-items-btn").addEventListener("click", async () => {
    await openAddItemsModal(orderId, async () => {
      await renderOrderDetail(orderId);
    });
  });

  try {
    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}/${orderId}`);
    if (!res.ok) throw new Error("No se pudo obtener la orden");
    const order = await res.json();

    orderState = {
      orderNumber: order.orderNumber,
      items: order.items.map(i => ({
        itemId: i.id,
        dishId: i.dish.id,
        name: i.dish.name,
        image: i.dish.image,
        quantity: i.quantity,
        notes: i.notes || "",
        status: i.status,
      })),
      meta: {
        status: order.status,
        deliveryType: order.deliveryType,
        deliveryTo: order.deliveryTo || "",
        totalAmount: order.totalAmount,
      },
    };

    renderOrder(container);
  } catch (err) {
    console.error("[renderOrderDetail] Error cargando orden:", err);
    showToast("Error al cargar la orden", "error");
  }
}

function renderOrder(container) {
  const content = container.querySelector("#order-content");
  const editable = orderState.meta.status.id !== 4 && orderState.meta.status.id !== 5;

  const orderItemsContainer = document.createElement("div");
  orderItemsContainer.classList.add("order-items-grid");

  orderState.items.forEach(item => {
    const itemElement = renderOrderItem(item, updated => {
      console.debug("[OrderItem] Actualizado:", updated);
    });
    orderItemsContainer.appendChild(itemElement);
  });

  content.innerHTML = `
    <div class="order-summary">
      <p><strong>Estado:</strong> ${orderState.meta.status.name}</p>
      <p><strong>Total:</strong> $${orderState.meta.totalAmount.toFixed(2)}</p>
      <p><strong>Tipo de entrega:</strong> ${orderState.meta.deliveryType.name}</p>
      ${orderState.meta.deliveryTo ? `<p><strong>Dirección:</strong> ${orderState.meta.deliveryTo}</p>` : ""}
    </div>

    <div class="order-items">
      <h2>Platos de la orden</h2>
    </div>

    ${!editable ? `<p class="locked-msg">Esta orden ya no puede modificarse (${orderState.meta.status.name}).</p>` : ""}
  `;

  content.querySelector(".order-items").appendChild(orderItemsContainer);

  if (editable) attachOrderEvents(container);
}

function attachOrderEvents(container) {
  const confirmBtn = container.querySelector("#confirm-btn");

  confirmBtn.addEventListener("click", async () => {
    const payload = {
      items: orderState.items.map(i => ({
        id: i.dishId,
        quantity: i.quantity,
        notes: i.notes || "",
      })),
    };

    console.group("[Confirm Update]");
    console.debug("Order ID:", orderState.orderNumber);
    console.debug("Payload:", payload);
    console.groupEnd();

    try {
      const res = await updateOrder(orderState.orderNumber, payload);
      console.debug("[Confirm PUT response]", res);
      showToast("Orden actualizada correctamente", "success");
      window.location.hash = "#/myOrders";
    } catch (err) {
      console.error("[Confirm PUT Error]", err);
      showToast("Error al actualizar la orden", "error");
    }
  });
}
