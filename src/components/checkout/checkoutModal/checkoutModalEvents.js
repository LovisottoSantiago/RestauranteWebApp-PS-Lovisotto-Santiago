export function setupCheckoutModalEvents(modal, deliveryTypes, onConfirm, onCancel) {
  const form = modal.querySelector("#checkout-form");
  const deliveryTypeSelect = modal.querySelector("#delivery-type");
  const addressGroup = modal.querySelector("#address-group");
  const addressInput = modal.querySelector("#delivery-address");
  const closeBtn = modal.querySelector("#close-checkout");
  const cancelBtn = modal.querySelector("#cancel-checkout");

  const closeModal = () => {
    onCancel?.();
    modal.remove();
  };

  const toggleAddressVisibility = (typeId) => {
    const requiresAddress = typeId === 1;
    addressGroup.style.display = requiresAddress ? "block" : "none";
    addressInput.required = requiresAddress;
    if (!requiresAddress) addressInput.value = "";
  };

  const handleDeliveryChange = (e) => {
    const typeId = parseInt(e.target.value);
    const selectedType = deliveryTypes.find(t => t.id === typeId);
    toggleAddressVisibility(selectedType?.id || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const checkoutData = {
      deliveryTypeId: parseInt(formData.get("deliveryType")),
      deliveryAddress: formData.get("deliveryAddress")?.trim() || null,
      notes: formData.get("notes")?.trim() || null,
    };

    onConfirm?.(checkoutData);
    modal.remove();
  };

  deliveryTypeSelect.addEventListener("change", handleDeliveryChange);
  form.addEventListener("submit", handleSubmit);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  const initialType = parseInt(deliveryTypeSelect.value);
  toggleAddressVisibility(initialType);
}
