import { showToast } from "../../components/toast/toast.js";
import { updateOrder } from "../../services/order/updateOrder.js";
import { getOrderById } from "../../services/order/getOrderById.js";
import { openAddItemsModal } from "./addItems/addItemsModal.js";
import { renderOrderTemplate } from "./orderDetailTemplate.js";
import { attachOrderEvents } from "./orderDetailEvents.js";
import { renderOrderItem } from "../../components/order/orderItem/orderItem.js";
import { mapStatusToSpanish } from "../../components/statusMapper/statusMapper.js";
import { mapDeliveryTypeName } from "../../components/deliveryTypeMapper/deliveryTypeMapper.js";

let orderState = null;

export async function renderOrderDetail(orderId) {
  const container = document.getElementById("app");
  container.innerHTML = renderOrderTemplate(orderId);

  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.hash = "#/myOrders";
  });

  document.getElementById("add-items-btn").addEventListener("click", async () => {
    await openAddItemsModal(orderId, async () => {
      await renderOrderDetail(orderId);
    });
  });

  try {
    const order = await getOrderById(orderId);

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

  function renderOrder(container) {
    const content = container.querySelector("#order-content");
    const editable = orderState.meta.status.id !== 4 && orderState.meta.status.id !== 5;

    if (orderState.meta.status.id === 5) {
      const addBtn = container.querySelector("#add-items-btn");
      const confirmBtn = container.querySelector("#confirm-btn");
      if (addBtn) addBtn.style.display = "none";
      if (confirmBtn) confirmBtn.style.display = "none";
    }
    
    content.innerHTML = `
      <div class="order-summary">
        <p><strong>Estado:</strong> ${mapStatusToSpanish(orderState.meta.status.id)}</p>
        <p><strong>Total:</strong> $${orderState.meta.totalAmount.toFixed(2)}</p>
        <p><strong>Tipo de entrega:</strong> ${mapDeliveryTypeName(orderState.meta.deliveryType.name)}</p>
        ${orderState.meta.deliveryTo ? `<p><strong>Dirección:</strong> ${orderState.meta.deliveryTo}</p>` : ""}
      </div>
      <div class="order-items">
        <h2>Platos de la orden</h2>
        <div class="order-items-grid"></div>
      </div>
      ${!editable ? `<p class="locked-msg">Esta orden ya no puede modificarse (${mapStatusToSpanish(orderState.meta.status.id)}).</p>` : ""}
    `;

    const orderItemsContainer = content.querySelector(".order-items-grid");

    orderState.items.forEach(item => {
      const itemElement = renderOrderItem(item, updated => {
        console.debug("[OrderItem] Actualizado:", updated);
      });

      if (item.status.id === 5) {
        itemElement.classList.add("locked-item");
        const inputs = itemElement.querySelectorAll("input, textarea, button");
        inputs.forEach(el => (el.disabled = true));
      }

      orderItemsContainer.appendChild(itemElement);
    });

    if (editable) attachOrderEvents(container, orderState, updateOrder, showToast);
  }
}
