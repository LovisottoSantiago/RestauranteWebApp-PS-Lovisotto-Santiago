import { getAllOrders } from "../../services/order/getAllOrders.js";
import { getOrderById } from "../../services/order/getOrderById.js";
import { updateOrderItemStatus } from "../../services/order/updateOrderItem.js";
import { showToast } from "../../components/toast/toast.js";
import { openOrderItemsModal } from "./orderItemsModal.js";
import { renderStatusCard } from "../../components/status/statusCard.js";

export async function renderAdmin() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="admin-view">
      <div class="admin-header">
        <h2>Panel de Administración</h2>
        <button id="admin-logout">Cerrar sesión</button>
      </div>
      <div id="admin-orders" class="admin-orders">
        <p>Cargando órdenes...</p>
      </div>
    </section>
  `;

  document.getElementById("admin-logout").addEventListener("click", () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.hash = "#/";
  });

  const ordersContainer = document.getElementById("admin-orders");

  async function loadOrders() {
    try {
      const orders = await getAllOrders();

      if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = "<p>No se encontraron órdenes.</p>";
        return;
      }

      // Ordenar por fecha descendente
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      ordersContainer.innerHTML = orders.map(renderStatusCard).join("");

      // Escuchar clics en los botones "Ver ítems"
      ordersContainer.querySelectorAll(".btn-open-items").forEach(btn => {
        btn.addEventListener("click", async e => {
          const orderId = e.target.dataset.id;
          const order = await getOrderById(orderId);
          await openOrderItemsModal(order, async (itemId, newStatus) => {
            try {
              await updateOrderItemStatus(orderId, itemId, newStatus);
              showToast(`Item #${itemId} actualizado correctamente`, "success");

              // Refrescar solo esa orden en el panel
              const updatedOrder = await getOrderById(orderId);
              updateOrderCard(orderId, updatedOrder);
            } catch (err) {
              showToast(err.message || "Error al actualizar estado", "error");
            }
          });
        });
      });
    } catch (err) {
      console.error("[Admin] Error:", err);
      ordersContainer.innerHTML = "<p>Error al cargar órdenes.</p>";
    }
  }

  // Reemplaza solo una orden sin recargar toda la lista
  function updateOrderCard(orderId, updatedOrder) {
    const card = ordersContainer.querySelector(`[data-id="${orderId}"]`)?.closest(".admin-order-card");
    if (!card) return;

    const newHTML = renderStatusCard(updatedOrder);
    card.outerHTML = newHTML;
  }

  // Carga inicial
  await loadOrders();

  // Actualización periódica automática cada 3 segundos
  setInterval(loadOrders, 1000);
}
