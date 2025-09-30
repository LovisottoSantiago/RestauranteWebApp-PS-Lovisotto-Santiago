export function renderCategoryFilter(container, categories, onSelectCategory) {
  container.innerHTML = `
    <button class="filter-btn active" data-cat="Todas">Todas</button>
    ${categories.map(cat => `
      <button class="filter-btn" data-cat="${cat.id}">${cat.name}</button>
    `).join("")}
  `;

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      onSelectCategory(btn.dataset.cat);
    });
  });
}
