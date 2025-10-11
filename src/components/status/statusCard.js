import { formatArgentineTime } from "../time/formatTime.js";

export function renderStatusCard(order) {
  const bloqueada = order.status.id === 5;

  return `
    <article class="admin-order-card ${bloqueada ? "locked" : ""}">
      <header>
        <h3>Orden #${order.orderNumber}</h3>
        <p><strong>Creada:</strong> ${formatArgentineTime(order.createdAt)}</p>
        <p><strong>Total:</strong> $${order.totalAmount.toFixed(2)}</p>
        <p><strong>Estado:</strong> ${mapStatusToSpanish(order.status.id)}</p>
      </header>
      <footer>
        <button 
          class="btn-primary btn-open-items" 
          data-id="${order.orderNumber}" 
          ${bloqueada ? "disabled" : ""}>
          ${bloqueada ? "Cerrada" : "Ver ítems"}
        </button>
      </footer>
    </article>
  `;
}

export function mapStatusToSpanish(id) {
  switch (id) {
    case 1: return "Pendiente";
    case 2: return "En preparación";
    case 3: return "Listo";
    case 4: return "En entrega";
    case 5: return "Cerrado";
    default: return "Desconocido";
  }
}
