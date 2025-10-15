export function showConfirmModal(message, onConfirm) {
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";
  overlay.innerHTML = `
    <div class="confirm-modal">
      <p>${message}</p>
      <div class="confirm-actions">
      <button id="confirm-no" class="btn-secondary">Cancelar</button>
        <button id="confirm-yes" class="btn-primary">Aceptar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector("#confirm-yes").onclick = () => {
    onConfirm?.();
    overlay.remove();
  };
  overlay.querySelector("#confirm-no").onclick = () => overlay.remove();
}
