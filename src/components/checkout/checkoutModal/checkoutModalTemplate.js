// checkoutModalTemplate.js
export function createCheckoutModalHTML(deliveryTypes) {
  return `
    <div class="checkout-modal">
      <div class="checkout-modal-header">
        <h2>Confirmar Orden</h2>
        <button class="close-btn" id="close-checkout">×</button>
      </div>

      <form id="checkout-form" class="checkout-form">
        <div class="form-group">
          <label for="delivery-type">Tipo de entrega *</label>
          <select id="delivery-type" name="deliveryType" required>
            <option value="">Selecciona una opción</option>
            ${deliveryTypes.map(type => 
              `<option value="${type.id}">${type.name}</option>`
            ).join('')}
          </select>
        </div>

        <div class="form-group" id="address-group" style="display: none;">
          <label for="delivery-address">Dirección de entrega *</label>
          <input type="text" id="delivery-address" name="deliveryAddress" placeholder="Ej: Av. Corrientes 1234, Piso 5B" maxlength="200"/>
          <small class="form-hint">Incluye referencias útiles (timbre, piso, etc.)</small>
        </div>

        <div class="form-group">
          <label for="order-notes">Notas adicionales</label>
          <textarea id="order-notes" name="notes" placeholder="Indica si tenés alguna preferencia especial..." rows="3" maxlength="500"></textarea>
          <small class="form-hint">Ejemplo: portón negro, horario de entrega, etc.</small>
        </div>

        <div class="checkout-actions">
          <button type="button" class="btn-secondary" id="cancel-checkout">Cancelar</button>
          <button type="submit" class="btn-primary">Confirmar Pedido</button>
        </div>
      </form>
    </div>
  `;
}
