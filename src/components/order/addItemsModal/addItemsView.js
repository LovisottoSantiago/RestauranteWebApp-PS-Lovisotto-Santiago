export function openAddItemsModal(orderId) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  overlay.innerHTML = `
    <div class="modal add-items-modal">
      <header class="modal-header">
        <h2>Agregar platos a la orden #${orderId}</h2>
        <button id="close-modal" class="btn-close">×</button>
      </header>
      <div class="modal-body">
        <div id="category-list" class="category-list"></div>
        <div id="category-description" class="category-description">
          Mostrando todos los platos disponibles.
        </div>
        <div id="search-sort-wrapper" class="search-sort-wrapper"></div>
        <div id="dish-list" class="dish-list"></div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector("#close-modal").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) overlay.remove();
  });

  return overlay;
}
