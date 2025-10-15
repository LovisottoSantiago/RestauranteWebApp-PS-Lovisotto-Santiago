import { mapStatusToSpanish } from "../statusMapper/statusMapper.js";
import { mapDeliveryTypeName } from "../deliveryTypeMapper/deliveryTypeMapper.js";
import { formatArgentineTime } from "../time/formatTime.js";

export function renderGenericOrderCard(order) {
  const bloqueada = order.status.id === 5;

  return `
    <article class="admin-order-card ${bloqueada ? "locked" : ""}">
      <header>
        <h3>Orden #${order.orderNumber}</h3>
        <p><strong>Creada:</strong> ${formatArgentineTime(order.createdAt)}</p>
        <p><strong>Total:</strong> $${order.totalAmount.toFixed(2)}</p>
        <p><strong>Estado:</strong> ${mapStatusToSpanish(order.status.id)}</p>
        <p><strong>Tipo de entrega:</strong> ${mapDeliveryTypeName(order.deliveryType?.name)}</p>
        ${order.deliveryTo ? `<p><strong>Dirección:</strong> ${order.deliveryTo}</p>` : ""}
        <p><strong>Notas de la orden:</strong> ${order.notes && order.notes.trim() !== "" ? order.notes : "No tiene notas"}</p>
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
