import { renderDishList } from "../../dish/dishList/dishList.js";
import { setCurrentCategoryFilter } from "../../../views/menu/menu.js";

export function handleCategorySelection(clickedCard, category) {
  document.querySelectorAll(".category-card").forEach(c =>
    c.classList.remove("active")
  );
  clickedCard.classList.add("active");
  
  const descBox = document.getElementById("category-description");
  if (descBox) {
    if (category.id === "all") {
      descBox.textContent = "Mostrando todos los platos disponibles.";
    } else {
      descBox.textContent = category.description || "Sin descripción disponible.";
    }
  }
  
  const categoryId = category.id === "all" ? null : category.id;
  setCurrentCategoryFilter(categoryId);
  

  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput ? searchInput.value.trim() : "";
  
  const filters = {};
  if (categoryId) {
    filters.category = categoryId;
  }
  if (searchTerm) {
    filters.name = searchTerm;
  }
  
  renderDishList(filters);
}