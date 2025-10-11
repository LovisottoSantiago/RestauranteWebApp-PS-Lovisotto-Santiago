import { getCartTotal } from "../utils/cartService.js";

export function attachCartItemEvents(itemDiv, item, onRemove, onUpdateNotes, onUpdateQuantity) {
  const notesInput = itemDiv.querySelector('.item-notes-input');
  const qtyInput = itemDiv.querySelector('.qty-input');
  const decreaseBtn = itemDiv.querySelector('.qty-decrease');
  const increaseBtn = itemDiv.querySelector('.qty-increase');
  const removeBtn = itemDiv.querySelector('.remove-btn');
  const priceSpan = itemDiv.querySelector('.cart-item-price span');

  let debounceTimer;

  notesInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onUpdateNotes?.(item.id, e.target.value);
    }, 500);
  });

  const updateQuantity = (newQty) => {
    let validQty = parseInt(newQty);
    if (isNaN(validQty) || validQty < 1) validQty = 1;
    else if (validQty > 50) validQty = 50;

    qtyInput.value = validQty;

    const newPrice = (item.price * validQty).toFixed(2);
    priceSpan.textContent = `$${newPrice}`;

    onUpdateQuantity?.(item.id, validQty);

    const totalElement = document.getElementById("cart-total-amount");
    if (totalElement) {
      totalElement.textContent = `$${getCartTotal().toFixed(2)}`;
    }
  };

  decreaseBtn.addEventListener('click', () => updateQuantity(parseInt(qtyInput.value) - 1));
  increaseBtn.addEventListener('click', () => updateQuantity(parseInt(qtyInput.value) + 1));
  qtyInput.addEventListener('change', (e) => updateQuantity(e.target.value));
  qtyInput.addEventListener('keypress', (e) => {
    if (['-', '+', 'e', '.'].includes(e.key)) e.preventDefault();
  });

  removeBtn.addEventListener('click', () => onRemove(item.id));
}
