import { getOrderById } from "../../services/order/getOrderById.js";
import { showToast } from "../../components/toast/toast.js";
import { formatArgentineTime } from "../../components/time/formatTime.js";
import { mapStatusToSpanish } from "../../components/statusMapper/statusMapper.js";
import { mapDeliveryTypeName } from "../../components/deliveryTypeMapper/deliveryTypeMapper.js";

export async function renderMyOrders() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="my-orders-view">
      <header class="orders-header">
        <h1>Mis Comandas Activas</h1>
      </header>
      <div id="orders-list" class="orders-list">
        <p>Cargando...</p>
      </div>
    </section>
  `;

  const ordersContainer = document.getElementById("orders-list");

  let savedOrders = [];
  try {
    const parsed = JSON.parse(localStorage.getItem("userOrders") || "[]");
    if (Array.isArray(parsed)) {
      savedOrders = parsed.map(id => String(id)).filter(Boolean);
    }
  } catch {
    console.warn("[renderMyOrders] userOrders inválido en localStorage");
    savedOrders = [];
  }

  if (savedOrders.length === 0) {
    ordersContainer.innerHTML = `<p>No tenés comandas registradas en este navegador.</p>`;
    return;
  }

  try {
    const results = (
      await Promise.all(
        savedOrders.map(async id => {
          try {
            const order = await getOrderById(id);
            return order || null;
          } catch {
            console.warn(`[renderMyOrders] No se pudo obtener la orden #${id}`);
            return null;
          }
        })
      )
    ).filter(Boolean);

    const activeOrders = results.filter(o => o.status?.id !== 5);
    activeOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (activeOrders.length === 0) {
      ordersContainer.innerHTML = `<p>No se encontraron comandas activas.</p>`;
      return;
    }

    ordersContainer.innerHTML = activeOrders
      .map(order => `
        <article class="order-card">
          <header class="order-card-header">
            <h2>Orden #${order.orderNumber}</h2>
          </header>
          <div class="order-card-body">
            <p><strong>Total:</strong> $${order.totalAmount.toFixed(2)}</p>
            <p><strong>Estado:</strong> ${mapStatusToSpanish(order.status?.id)}</p>
            <p><strong>Tipo de entrega:</strong> ${mapDeliveryTypeName(order.deliveryType?.name)}</p>
            <p><strong>Creada:</strong> ${formatArgentineTime(order.createdAt)}</p>
            <hr id="order-items-separator" />
          </div>
          <footer class="order-card-footer">
            <button class="btn-secondary" data-id="${order.orderNumber}">
              Ver detalle
            </button>
          </footer>
        </article>
      `)
      .join("");

    ordersContainer.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.hash = `#/order/${btn.dataset.id}`;
      });
    });
  } catch (err) {
    console.error("[renderMyOrders] Error:", err);
    showToast("Error al cargar tus comandas", "error");
  }
}
