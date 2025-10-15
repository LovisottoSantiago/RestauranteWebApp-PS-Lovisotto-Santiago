export function renderPaginationControls({ currentPage, totalPages, onPageChange }) {
  const paginationContainer = document.getElementById("pagination-controls");

  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  paginationContainer.innerHTML = `
    <div class="pagination">
      <button class="page-btn" id="prev-page" ${currentPage === 1 ? "disabled" : ""}>Anterior</button>
      <span class="page-info">Página ${currentPage} de ${totalPages}</span>
      <button class="page-btn" id="next-page" ${currentPage === totalPages ? "disabled" : ""}>Siguiente</button>
    </div>
  `;

  document.getElementById("prev-page")?.addEventListener("click", () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });

  document.getElementById("next-page")?.addEventListener("click", () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  });
}
