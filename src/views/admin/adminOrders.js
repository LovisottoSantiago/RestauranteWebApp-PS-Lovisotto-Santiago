import { getAllOrders } from "../../services/order/getAllOrders.js";
import { getOrderById } from "../../services/order/getOrderById.js";
import { updateOrderItemStatus } from "../../services/order/updateOrderItem.js";
import { showToast } from "../../components/toast/toast.js";
import { openOrderItemsModal } from "./orderItemsModal.js";
import { renderGenericOrderCard } from "../../components/genericOrderMapper/genericOrderMapper.js";

export async function loadOrders(isAutoRefresh = false, filters = {}) {
  const container = document.getElementById("admin-orders");

  try {
    const orders = await getAllOrders({
      status: filters.status ?? undefined,
      from: filters.from ?? undefined,
      to: filters.to ?? undefined,
      includeClosed: filters.status === 5,
    });

    if (!orders?.length) {
      container.innerHTML = "<p>No se encontraron órdenes.</p>";
      return;
    }

    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    container.innerHTML = orders.map(renderGenericOrderCard).join("");

    container.querySelectorAll(".btn-open-items").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const orderId = e.target.dataset.id;
        const order = await getOrderById(orderId);
        await openOrderItemsModal(order, async (itemId, newStatus) => {
          try {
            await updateOrderItemStatus(orderId, itemId, newStatus);
            showToast(`Item #${itemId} actualizado correctamente`, "success");
            const updatedOrder = await getOrderById(orderId);
            updateOrderCard(orderId, updatedOrder);
          } catch (err) {
            showToast(err.message || "Error al actualizar estado", "error");
          }
        });
      });
    });
  } catch (err) {
    if (!isAutoRefresh) console.error("[Admin] Error:", err);
    container.innerHTML = "<p>Error al cargar órdenes.</p>";
  }
}

function updateOrderCard(orderId, updatedOrder) {
  const container = document.getElementById("admin-orders");
  const card = container.querySelector(`[data-id="${orderId}"]`)?.closest(".admin-order-card");
  if (!card) return;
  card.outerHTML = renderGenericOrderCard(updatedOrder);
}
