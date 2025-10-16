import { getAllCategories } from "../../../services/category/getAllCategories.js";
import { renderCategoryCard } from "../categoryCard/categoryCard.js";
import { addItemsFilters } from "../../../views/myOrders/addItems/addItemsFilter.js";
import { renderDishListWithAdd } from "../../../views/myOrders/addItems/addItemsModal.js";

export async function renderCategoryListForOrder(overlay, orderId, onAddedCallback) {
  const container = overlay.querySelector("#category-list");
  const descriptionEl = overlay.querySelector("#category-description");

  const categories = await getAllCategories();
  container.innerHTML = "";

  const allCategory = { id: "all", name: "Todas", description: "Mostrando todos los platos." };
  const allBtn = renderCategoryCard(allCategory);
  allBtn.classList.add("active");
  container.appendChild(allBtn);

  allBtn.addEventListener("click", async () => {
    addItemsFilters.setCategory(null);
    container.querySelectorAll(".category-card").forEach(btn => btn.classList.remove("active"));
    allBtn.classList.add("active");
    descriptionEl.textContent = "Mostrando todos los platos disponibles.";
    await renderDishListWithAdd(overlay, orderId, onAddedCallback);
  });

  categories.forEach((category) => {
    const btn = renderCategoryCard(category);
    btn.addEventListener("click", async () => {

      addItemsFilters.setCategory(category.id);

      container.querySelectorAll(".category-card").forEach(btn => btn.classList.remove("active"));
      btn.classList.add("active");
      descriptionEl.textContent = category.description || `Mostrando platos de ${category.name}.`;

      const filters = addItemsFilters.get();
      await renderDishListWithAdd(overlay, orderId, onAddedCallback, filters);
    });
    container.appendChild(btn);
  });
}
