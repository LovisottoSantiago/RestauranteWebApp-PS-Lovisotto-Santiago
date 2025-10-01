import { getAllCategories } from "../../../services/category/getAllCategories.js";
import { renderCategoryCard } from "../categoryCard/categoryCard.js";

export async function renderCategoryList() {
  try {
    const categories = await getAllCategories();
    const container = document.getElementById("category-list");
    
    if (!container) {
      console.error("No se encontró el contenedor #category-list");
      return;
    }
    
    container.innerHTML = "";
    
    // Botón "Todas" con el mismo formato
    const allCategory = { id: 'all', name: 'Todas', order: -1 , description: 'Mostrando todos los platos.'};
    const allBtn = renderCategoryCard(allCategory);
    allBtn.classList.add('active');
    container.appendChild(allBtn);
    
    // Renderizar categorías ordenadas
    const sortedCategories = categories.sort((a, b) => a.order - b.order);
    sortedCategories.forEach(category => {
      const card = renderCategoryCard(category);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al renderizar la lista de categorías:", error);
  }
}