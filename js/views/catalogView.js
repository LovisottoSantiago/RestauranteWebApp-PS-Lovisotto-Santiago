import { dishService } from "../modules/dish/dishService.js";
import { categoryService } from "../modules/category/categoryService.js";
import { createDishCard } from "../modules/dish/dishCard.js";
import { renderCategoryFilter } from "./categoryFilter.js";
import { renderOrderPanel } from "../modules/order/orderPanel.js";

export async function renderCatalog(container) {
  container.innerHTML = `
    <div class="catalog-layout">
      <section class="catalog">
        <h2>Catálogo de productos</h2>
        <div class="category-filter"></div>
        <div class="product-list">Cargando productos...</div>
      </section>
      <div id="order-container"></div>
    </div>
  `;

  const list = container.querySelector(".product-list");
  const filterBar = container.querySelector(".category-filter");
  const orderContainer = container.querySelector("#order-container");

  // Renderizar el panel de la orden
  renderOrderPanel(orderContainer);

  try {
    const [dishes, categories] = await Promise.all([
      dishService.getAll(),
      categoryService.getAll()
    ]);

    if (!dishes || dishes.length === 0) {
      list.innerHTML = "<p>No hay productos disponibles.</p>";
      return;
    }

    const orderedCategories = [...categories].sort((a, b) => a.order - b.order);

    function renderList(categoryId) {
      list.innerHTML = "";

      const filtered = categoryId === "Todas"
        ? dishes
        : dishes.filter(d => d.category.id === Number(categoryId));

      if (filtered.length === 0) {
        list.innerHTML = "<p>No hay productos en esta categoría.</p>";
        return;
      }

      filtered.forEach(dish => list.appendChild(createDishCard(dish)));
    }

    renderCategoryFilter(filterBar, orderedCategories, renderList);
    renderList("Todas");
  } catch (err) {
    console.error("Error en fetch:", err);
    list.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
}
