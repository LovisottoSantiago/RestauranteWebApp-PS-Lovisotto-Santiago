import { getAllOrders } from "../../services/order/getAllOrders.js";
import { getOrderById } from "../../services/order/getOrderById.js";
import { updateOrderItemStatus } from "../../services/order/updateOrderItem.js";
import { showToast } from "../../components/toast/toast.js";
import { openOrderItemsModal } from "./orderItemsModal.js";
import { renderStatusCard } from "../../components/status/statusCard.js";

export async function renderAdmin() {
  if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
    showToast("Acceso denegado. Iniciá sesión primero.", "error");
    window.location.hash = "#/adminLogin";
    return;
  }


  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="admin-view">
      <div class="admin-header">
        <h2>Panel de Administración</h2>
        <button id="admin-logout">Cerrar sesión</button>
      </div>

      <div class="admin-filters">
        <div class="filter-group">
          <label for="status-filter">Estado:</label>
          <select id="status-filter">
            <option value="">Todos (excepto cerradas)</option>
            <option value="1">Pendiente</option>
            <option value="2">En preparación</option>
            <option value="3">Listo</option>
            <option value="4">En entrega</option>
            <option value="5">Cerrado</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Desde:</label>
          <div class="date-field">
            <input type="text" id="from-date-display" class="date-display" placeholder="dd/mm/aaaa" readonly />
            <input type="date" id="from-date" class="date-native" />
            <button type="button" class="open-calendar" data-target="from-date" aria-label="Abrir calendario">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v1H1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm3 2v2h2V6H4zm3 0v2h2V6H7zm3 0v2h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="filter-group">
          <label>Hasta:</label>
          <div class="date-field">
            <input type="text" id="to-date-display" class="date-display" placeholder="dd/mm/aaaa" readonly />
            <input type="date" id="to-date" class="date-native" />
            <button type="button" class="open-calendar" data-target="to-date" aria-label="Abrir calendario">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v1H1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm3 2v2h2V6H4zm3 0v2h2V6H7zm3 0v2h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="admin-orders" class="admin-orders">
        <p>Cargando órdenes...</p>
      </div>
    </section>
  `;

  // Logout
  document.getElementById("admin-logout").addEventListener("click", () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    showToast("Sesión cerrada", "info");
    window.location.hash = "#/adminLogin";
  });

  const ordersContainer = document.getElementById("admin-orders");
  const statusFilter = document.getElementById("status-filter");

  const fromNative = document.getElementById("from-date");
  const toNative = document.getElementById("to-date");
  const fromDisplay = document.getElementById("from-date-display");
  const toDisplay = document.getElementById("to-date-display");

  // Utilidades de fecha
  const ymdToDmy = (ymd) => {
    if (!ymd) return "";
    const [y, m, d] = ymd.split("-");
    return `${d}/${m}/${y}`;
  };
  const nativeToISO = (ymd) => {
    if (!ymd) return null;
    const dt = new Date(`${ymd}T00:00:00`);
    return isNaN(dt.getTime()) ? null : dt.toISOString();
  };

  // Sincronización nativa -> display -> filtros
  function syncDate(nativeInput, displayInput) {
    displayInput.value = ymdToDmy(nativeInput.value);
    applyFilters();
  }

  // Abrir calendario al pulsar el botón
  document.querySelectorAll(".open-calendar").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input.showPicker) {
        input.showPicker();
      } else {
        input.focus();
        input.click();
      }
    });
  });

  // Listeners
  fromNative.addEventListener("change", () => syncDate(fromNative, fromDisplay));
  toNative.addEventListener("change", () => syncDate(toNative, toDisplay));
  statusFilter.addEventListener("change", applyFilters);

  async function loadOrders(selectedStatus = null, fromISO = null, toISO = null) {
    try {
      const orders = await getAllOrders({
        status: selectedStatus || undefined,
        from: fromISO || undefined,
        to: toISO || undefined,
        includeClosed: selectedStatus === 5,
      });

      if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = "<p>No se encontraron órdenes.</p>";
        return;
      }

      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      ordersContainer.innerHTML = orders.map(renderStatusCard).join("");

      ordersContainer.querySelectorAll(".btn-open-items").forEach(btn => {
        btn.addEventListener("click", async e => {
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
      console.error("[Admin] Error:", err);
      ordersContainer.innerHTML = "<p>Error al cargar órdenes.</p>";
    }
  }

  function updateOrderCard(orderId, updatedOrder) {
    const card = ordersContainer.querySelector(`[data-id="${orderId}"]`)?.closest(".admin-order-card");
    if (!card) return;
    card.outerHTML = renderStatusCard(updatedOrder);
  }

  async function applyFilters() {
    const status = statusFilter.value ? parseInt(statusFilter.value) : null;
    const fromISO = nativeToISO(fromNative.value);
    const toISO = nativeToISO(toNative.value);
    await loadOrders(status, fromISO, toISO);
  }

  // Inicial
  await loadOrders();

  // Refresco cada 3 s manteniendo filtros
  setInterval(applyFilters, 3000);
}
