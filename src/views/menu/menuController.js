import { renderDishList } from "../../components/dish/dishList/dishList.js";
import { renderCategoryList } from "../../components/category/categoryList/categoryList.js";
import { renderSearchBar } from "../../components/searchBar/searchBar.js";
import { menuFilters } from "./menuFilters.js";

export function initMenuController() {
  const wrapper = document.getElementById("search-sort-wrapper");

  const searchBar = renderSearchBar((term) => {
    menuFilters.setSearch(term);
    handleSearch();
  });

  const sortSelect = document.createElement("select");
  sortSelect.classList.add("sort-select");
  sortSelect.innerHTML = `
    <option value="">Ordenar por precio</option>
    <option value="asc">Menor a mayor</option>
    <option value="desc">Mayor a menor</option>
  `;
  sortSelect.addEventListener("change", (e) => {
    menuFilters.setSort(e.target.value);
    handleSearch();
  });

  const row = document.createElement("div");
  row.classList.add("search-sort-container");
  row.appendChild(searchBar);
  row.appendChild(sortSelect);
  wrapper.appendChild(row);

  renderCategoryList();
  renderDishList();
}

export function handleSearch() {
  const filters = menuFilters.get();
  renderDishList(filters);
}

export function setCurrentCategoryFilter(categoryId) {
  menuFilters.setCategory(categoryId);
  handleSearch();
}
