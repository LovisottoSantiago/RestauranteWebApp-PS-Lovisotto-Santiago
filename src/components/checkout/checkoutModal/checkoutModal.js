// components/checkout/checkoutModal/checkoutModal.js
import { getAllDeliveryTypes } from "../../../services/deliveryType/getAllDeliveryTypes.js";

export async function renderCheckoutModal(onConfirm, onCancel) {
  const modal = document.createElement('div');
  modal.classList.add('checkout-modal-overlay');
  
  const deliveryTypes = await getAllDeliveryTypes();
  
  modal.innerHTML = `
    <div class="checkout-modal">
      <div class="checkout-modal-header">
        <h2>Confirmar Pedido</h2>
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
          <input 
            type="text" 
            id="delivery-address" 
            name="deliveryAddress"
            placeholder="Ej: Av. Corrientes 1234, Piso 5B"
            maxlength="200"
          />
          <small class="form-hint">Incluye referencias útiles (timbre, piso, etc.)</small>
        </div>
        
        <div class="form-group">
          <label for="order-notes">Notas adicionales</label>
          <textarea 
            id="order-notes" 
            name="notes"
            placeholder="Indica si tienes alguna preferencia especial..."
            rows="3"
            maxlength="500"
          ></textarea>
          <small class="form-hint">Opcional: alergias, horario de entrega, etc.</small>
        </div>
        
        <div class="checkout-actions">
          <button type="button" class="btn-secondary" id="cancel-checkout">
            Cancelar
          </button>
          <button type="submit" class="btn-primary">
            Confirmar Pedido
          </button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Referencias a elementos
  const form = modal.querySelector('#checkout-form');
  const deliveryTypeSelect = modal.querySelector('#delivery-type');
  const addressGroup = modal.querySelector('#address-group');
  const addressInput = modal.querySelector('#delivery-address');
  const closeBtn = modal.querySelector('#close-checkout');
  const cancelBtn = modal.querySelector('#cancel-checkout');
  
  // Mostrar/ocultar campo de dirección según tipo de entrega
  deliveryTypeSelect.addEventListener('change', (e) => {
    const selectedType = deliveryTypes.find(t => t.id === parseInt(e.target.value));
    
    // ID 1 = Delivery (según tu YAML)
    if (selectedType && selectedType.id === 1) {
      addressGroup.style.display = 'block';
      addressInput.required = true;
    } else {
      addressGroup.style.display = 'none';
      addressInput.required = false;
      addressInput.value = '';
    }
  });
  
  // Manejar envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const checkoutData = {
      deliveryTypeId: parseInt(formData.get('deliveryType')),
      deliveryAddress: formData.get('deliveryAddress') || null,
      notes: formData.get('notes') || null
    };
    
    if (onConfirm) {
      onConfirm(checkoutData);
    }
    
    modal.remove();
  });
  
  // Cerrar modal
  const closeModal = () => {
    if (onCancel) onCancel();
    modal.remove();
  };
  
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  return modal;
}