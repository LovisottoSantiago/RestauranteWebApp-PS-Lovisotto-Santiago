export function setupCheckoutModalEvents(modal, deliveryTypes, onConfirm, onCancel) {
  const form = modal.querySelector('#checkout-form');
  const deliveryTypeSelect = modal.querySelector('#delivery-type');
  const addressGroup = modal.querySelector('#address-group');
  const addressInput = modal.querySelector('#delivery-address');
  const closeBtn = modal.querySelector('#close-checkout');
  const cancelBtn = modal.querySelector('#cancel-checkout');

  const closeModal = () => {
    if (onCancel) onCancel();
    modal.remove();
  };

  deliveryTypeSelect.addEventListener('change', (e) => {
    const selectedType = deliveryTypes.find(t => t.id === parseInt(e.target.value));
    if (selectedType && selectedType.id === 1) {
      addressGroup.style.display = 'block';
      addressInput.required = true;
    } else {
      addressGroup.style.display = 'none';
      addressInput.required = false;
      addressInput.value = '';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const checkoutData = {
      deliveryTypeId: parseInt(formData.get('deliveryType')),
      deliveryAddress: formData.get('deliveryAddress') || null,
      notes: formData.get('notes') || null
    };
    if (onConfirm) onConfirm(checkoutData);
    modal.remove();
  });

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
