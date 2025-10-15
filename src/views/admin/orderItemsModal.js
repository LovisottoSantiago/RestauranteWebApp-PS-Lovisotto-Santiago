import { mapStatusToSpanish } from "../../components/statusMapper/statusMapper.js";

export async function openOrderItemsModal(order, onUpdate) {
  const existing = document.getElementById("order-items-modal");
  if (existing) existing.remove();

  const defaultImage = "/src/assets/images/img-not-found.jpg";

  const modal = document.createElement("div");
  modal.id = "order-items-modal";
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal-content-admin">
      <header class="modal-header-admin">
        <h2>Detalle de Orden #${order.orderNumber}</h2>
        <button id="close-modal" class="close-btn">×</button>
      </header>

      <section class="modal-body">
        <hr>
        <div class="modal-items">
          ${order.items
            .map(
              (i) => `
              <div class="modal-item" data-item-id="${i.id}">
                <div class="modal-item-image-wrapper">
                  <img 
                    src="${i.dish.image || defaultImage}" 
                    alt="${i.dish.name}" 
                    onerror="this.onerror=null; this.src='${defaultImage}';"
                    class="modal-item-image"
                  />
                </div>

                <div class="item-info">
                  <h3>${i.dish.name}</h3>
                  <p><strong>Estado actual:</strong> ${mapStatusToSpanish(i.status.id)}</p>

                  <label>Actualizar estado:</label>
                  <select class="status-select">
                    <option value="1" ${i.status.id === 1 ? "selected" : ""}>Pendiente</option>
                    <option value="2" ${i.status.id === 2 ? "selected" : ""}>En preparación</option>
                    <option value="3" ${i.status.id === 3 ? "selected" : ""}>Listo</option>
                    <option value="4" ${i.status.id === 4 ? "selected" : ""}>En entrega</option>
                    <option value="5" ${i.status.id === 5 ? "selected" : ""}>Cerrado</option>
                  </select>

                  <button class="btn-primary btn-save-status">Guardar</button>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#close-modal").addEventListener("click", () => modal.remove());

  modal.querySelectorAll(".btn-save-status").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const itemDiv = e.target.closest(".modal-item");
      const itemId = itemDiv.dataset.itemId;
      const newStatus = parseInt(itemDiv.querySelector(".status-select").value, 10);

      try {
        await onUpdate(itemId, newStatus);
        const statusText = mapStatusToSpanish(newStatus);
        const p = itemDiv.querySelector(".item-info p");
        if (p) p.innerHTML = `<strong>Estado actual:</strong> ${statusText}`;

        itemDiv.classList.add("updated");
        setTimeout(() => itemDiv.classList.remove("updated"), 800);
      } catch (err) {
        console.error("[Modal] Error al actualizar estado:", err);
      }
    });
  });
}
