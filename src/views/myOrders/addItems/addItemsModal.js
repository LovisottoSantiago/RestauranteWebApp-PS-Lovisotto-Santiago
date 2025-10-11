import { createModal } from "../../../components/modal/modal.js";
import { renderCategoryList } from "../../../components/category/categoryList/categoryList.js";
import { renderSearchBar } from "../../../components/searchBar/searchBar.js";
import { renderDishListWithAdd } from "./addItemsLogic.js";
import { addItemsFilters } from "./addItemsFilter.js";

export async function openAddItemsModal(orderId) {
  const modalContent = `
    <div class="menu-view" id="add-items-modal">
      <div id="category-list" class="category-list"></div>
      <div id="category-description" class="category-description">
        Mostrando todos los platos disponibles.
      </div>
      <div id="search-sort-wrapper" class="search-sort-wrapper"></div>
      <div id="dish-list" class="dish-list"></div>
    </div>
  `;

  const overlay = createModal(modalContent, `Agregar platos a la orden #${orderId}`);

  await renderCategoryList(document.getElementById("category-list"));
  setupAddItemsHeader(overlay, orderId);
  await renderDishListWithAdd(overlay, orderId);

  return overlay;
}

function setupAddItemsHeader(overlay, orderId) {
  const wrapper = overlay.querySelector("#search-sort-wrapper");

  // barra de búsqueda reutilizable
  const searchBar = renderSearchBar((term) => {
    addItemsFilters.setSearch(term);
    updateDishList(overlay, orderId);
  });

  // select de ordenamiento
  const sortSelect = document.createElement("select");
  sortSelect.classList.add("sort-select");
  sortSelect.innerHTML = `
    <option value="">Ordenar por precio</option>
    <option value="asc">Menor a mayor</option>
    <option value="desc">Mayor a menor</option>
  `;
  sortSelect.addEventListener("change", (e) => {
    addItemsFilters.setSort(e.target.value);
    updateDishList(overlay, orderId);
  });

  const row = document.createElement("div");
  row.classList.add("search-sort-container");
  row.appendChild(searchBar);
  row.appendChild(sortSelect);
  wrapper.appendChild(row);
}

async function updateDishList(overlay, orderId) {
  const filters = addItemsFilters.get();
  await renderDishListWithAdd(overlay, orderId, filters);
}
