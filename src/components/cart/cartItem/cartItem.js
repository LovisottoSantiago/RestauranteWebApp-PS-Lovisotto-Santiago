// components/cart/cartItem/cartItem.js
export function renderCartItem(item, onRemove, onUpdateNotes) {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('cart-item');
  
  itemDiv.innerHTML = `
    <div class="cart-item-info">
      <h3>${item.name}</h3>
      <input 
        type="text" 
        class="item-notes-input" 
        placeholder="Notas para este plato (opcional)"
        value="${item.notes || ''}"
        maxlength="200"
      />
      <span class="quantity">Cantidad: ${item.quantity}</span>
    </div>
    <div class="cart-item-price">
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-id="${item.id}">×</button>
    </div>
  `;
  
  // Guardar notas cuando el usuario escribe
  const notesInput = itemDiv.querySelector('.item-notes-input');
  let debounceTimer;
  
  notesInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (onUpdateNotes) {
        onUpdateNotes(item.id, e.target.value);
      }
    }, 500); // Espera 500ms después de que el usuario deje de escribir
  });
  
  itemDiv.querySelector('.remove-btn').addEventListener('click', () => {
    onRemove(item.id);
  });
  
  return itemDiv;
}