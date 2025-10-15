import { formatArgentineTime } from "../../components/time/formatTime.js";

export function renderOrderConfirmation(section, order) {
  section.innerHTML = `
    <h1>¡Pedido Confirmado!</h1>
    <div class="order-details">
      <p>Número de orden: <strong>#${order.orderNumber}</strong></p>
      <p>Total: <strong>$${order.totalAmount.toFixed(2)}</strong></p>
      <p>Realizado: ${formatArgentineTime(order.createdAt)}</p>
    </div>
    <div class="confirmation-actions">
      <button id="back-to-menu" class="btn-primary">Volver al menú</button>
    </div>
  `;
  section.querySelector("#back-to-menu").addEventListener("click", () => {
    window.location.hash = "#menu";
  });
}
