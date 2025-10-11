import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";
import { showToast } from "../../components/toast/toast.js";

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
  const savedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");

  if (savedOrders.length === 0) {
    ordersContainer.innerHTML = `<p>No tenés comandas registradas en este navegador.</p>`;
    return;
  }

  try {
    const promises = savedOrders.map(id =>
      fetch(`${API_BASE_URL}${ENDPOINTS.orders}/${id}`, {
        method: "GET", // en tu API el GET individual está definido como OPTIONS
      }).then(r => r.ok ? r.json() : null)
    );

    const results = (await Promise.all(promises)).filter(Boolean);

    if (results.length === 0) {
      ordersContainer.innerHTML = `<p>No se encontraron comandas activas.</p>`;
      return;
    }

    ordersContainer.innerHTML = results.map(order => `
      <article class="order-card">
        <h2>Orden #${order.orderNumber}</h2>
        <p>Total: $${order.totalAmount.toFixed(2)}</p>
        <p>Estado: ${order.status?.name || "Desconocido"}</p>
        <p>Entrega: ${order.deliveryType?.name || "N/A"}</p>
        <p>Fecha: ${new Date(order.createdAt).toLocaleString("es-AR")}</p>
        <button class="btn-secondary" data-id="${order.orderNumber}">Ver detalle</button>
      </article>
    `).join("");

    ordersContainer.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.hash = `#/order/${btn.dataset.id}`;
      });
    });
  } catch (err) {
    console.error(err);
    showToast("Error al cargar tus comandas", "error");
  }
}
