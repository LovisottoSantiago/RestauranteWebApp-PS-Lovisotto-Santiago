import { openAddItemsModal } from "./addItemsView.js";
import { initializeFilters, loadCategories, setupSearchAndSort, loadDishes } from "./addItemsLogic.js";

// Punto de entrada único del módulo
export async function openAddItems(orderId) {
  const overlay = openAddItemsModal(orderId);

  initializeFilters();

  const categoryContainer = overlay.querySelector("#category-list");
  const searchSortWrapper = overlay.querySelector("#search-sort-wrapper");

  await loadCategories(categoryContainer, overlay, loadDishes);
  setupSearchAndSort(searchSortWrapper, overlay, loadDishes);
  await loadDishes(overlay);
}
