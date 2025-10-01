import { renderDishList } from "../../components/dish/dishList/dishList.js";
import { renderCategoryList } from "../../components/category/categoryList/categoryList.js";

export function renderCarta() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="carta-view">
      <!-- Título general -->
      <header class="carta-header">
        <h1>Nuestra Carta</h1>
        <p>Descubre nuestros platos y especialidades</p>
      </header>

      <!-- Categorías en scroll horizontal -->
      <div id="category-list" class="category-list"></div>

      <!-- Descripción de categoría -->
      <div id="category-description" class="category-description">
        Mostrando todos los platos disponibles.
      </div>

      <!-- Platos -->
      <div id="dish-list"></div>
    </section>
  `;

  renderCategoryList();
  renderDishList();
}
