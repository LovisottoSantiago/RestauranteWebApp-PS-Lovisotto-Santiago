import { renderDishList } from "../../../dish/dishList/dishList.js";

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

  // Filtrar desde el backend
  if (category.id === "all") {
    renderDishList(); 
  } else {
    renderDishList({ category: category.id });
  }
}
