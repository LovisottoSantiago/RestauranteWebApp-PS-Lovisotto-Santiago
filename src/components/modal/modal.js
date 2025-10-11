export function createModal(contentHTML, title = "") {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  overlay.innerHTML = `
    <div class="modal-container">
      <header class="modal-header">
        <h2>${title}</h2>
        <button class="btn-close">×</button>
      </header>
      <div class="modal-body">${contentHTML}</div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector(".btn-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) overlay.remove();
  });

  return overlay;
}
