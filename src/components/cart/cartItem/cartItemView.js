export function createCartItemElement(item) {
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
      <div class="quantity-control">
        <button class="qty-btn qty-decrease" data-id="${item.id}">−</button>
        <input 
          type="number" 
          class="qty-input" 
          value="${item.quantity}" 
          min="1" 
          max="50"
          data-id="${item.id}"
        />
        <button class="qty-btn qty-increase" data-id="${item.id}">+</button>
      </div>
    </div>
    <div class="cart-item-price">
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-id="${item.id}">×</button>
    </div>
  `;
  
  return itemDiv;
}
