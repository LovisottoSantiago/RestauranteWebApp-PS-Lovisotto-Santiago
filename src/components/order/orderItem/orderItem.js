export function renderOrderItem(item, onChange) {
  const div = document.createElement("div");
  div.classList.add("order-item");
  div.dataset.itemId = item.itemId;

  const defaultImage = "/src/assets/images/img-not-found.jpg";

  div.innerHTML = `
    <img src="${item.image || defaultImage}" alt="${item.name}" onerror="this.onerror=null; this.src='${defaultImage}';" class="order-item-image"/>
    <div class="item-info">
      <h3>${item.name}</h3>

      <label>Notas:</label>
      <input 
        type="text" 
        class="item-notes-input" 
        value="${item.notes || ''}" 
        maxlength="200"
      />

      <label>Cantidad:</label>
      <div class="quantity-control">
        <button class="qty-btn qty-decrease">−</button>
        <input type="number" class="qty-input" value="${item.quantity}" min="1" max="50">
        <button class="qty-btn qty-increase">+</button>
      </div>

      <p>Estado: ${item.status.name}</p>
    </div>
  `;

  const inputQty = div.querySelector(".qty-input");
  const dec = div.querySelector(".qty-decrease");
  const inc = div.querySelector(".qty-increase");
  const note = div.querySelector(".item-notes-input");

  dec.addEventListener("click", () => {
    item.quantity = Math.max(1, item.quantity - 1);
    inputQty.value = item.quantity;
    if (onChange) onChange(item);
  });

  inc.addEventListener("click", () => {
    item.quantity = Math.min(50, item.quantity + 1);
    inputQty.value = item.quantity;
    if (onChange) onChange(item);
  });

  inputQty.addEventListener("change", e => {
    item.quantity = Math.max(1, Math.min(50, parseInt(e.target.value) || 1));
    inputQty.value = item.quantity;
    if (onChange) onChange(item);
  });

  note.addEventListener("input", e => {
    item.notes = e.target.value;
    if (onChange) onChange(item);
  });

  return div;
}
