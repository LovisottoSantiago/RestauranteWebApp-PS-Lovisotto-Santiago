import { handleCategorySelection } from "./utils/categoryUtils.js";

export function renderCategoryCard(category) {
  const card = document.createElement("div");
  card.classList.add("category-card");
  card.dataset.categoryId = category.id || "all";
  
  card.innerHTML = `
    <div class="category-card-content">
      <h2>${category.name}</h2>
    </div>
  `;
  
  card.addEventListener("click", () => {
    handleCategorySelection(card, category);
  });
  
  return card;
}
