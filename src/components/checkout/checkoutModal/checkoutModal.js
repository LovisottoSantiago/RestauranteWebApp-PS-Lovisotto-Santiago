import { getAllDeliveryTypes } from "../../../services/deliveryType/getAllDeliveryTypes.js";
import { createCheckoutModalHTML } from "./checkoutModalTemplate.js";
import { setupCheckoutModalEvents } from "./checkoutModalEvents.js";

export async function renderCheckoutModal(onConfirm, onCancel) {
  const modal = document.createElement('div');
  modal.classList.add('checkout-modal-overlay');

  const deliveryTypes = await getAllDeliveryTypes();
  modal.innerHTML = createCheckoutModalHTML(deliveryTypes);

  document.body.appendChild(modal);
  setupCheckoutModalEvents(modal, deliveryTypes, onConfirm, onCancel);

  return modal;
}
