export function renderOrderTemplate(orderId) {
  return `
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
}
