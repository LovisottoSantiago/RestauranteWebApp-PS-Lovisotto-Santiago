import { renderDishList } from "../../components/dish/dishList/dishList.js";
import { renderCategoryList } from "../../components/category/categoryList/categoryList.js";
import { renderSearchBar } from "../../components/searchBar/searchBar.js";

let currentCategoryFilter = null;

export function renderMenu() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="menu-view">
      <header class="menu-header">
        <h1>Nuestra Carta</h1>
        <p>Descubre nuestros platos y especialidades</p>
      </header>
      
      <div id="category-list" class="category-list"></div>
      <div id="category-description" class="category-description">
      Mostrando todos los platos disponibles.
      </div>
      
      <div id="search-bar-wrapper"></div>

      <div id="dish-list"></div>
    </section>
  `;
  
  const searchWrapper = document.getElementById("search-bar-wrapper");
  const searchBar = renderSearchBar((searchTerm) => {
    handleSearch(searchTerm);
  });
  searchWrapper.appendChild(searchBar);
  
  renderCategoryList();
  renderDishList();
}

function handleSearch(searchTerm) {
  const filters = {};
  
  if (currentCategoryFilter && currentCategoryFilter !== 'all') {
    filters.category = currentCategoryFilter;
  }
  
  if (searchTerm) {
    filters.name = searchTerm;
  }
  
  renderDishList(filters);
}

export function setCurrentCategoryFilter(categoryId) {
  currentCategoryFilter = categoryId;
}