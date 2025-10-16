import { createModal } from "../../../components/modal/modal.js";
import { renderCategoryListForOrder } from "../../../components/category/categoryList/categoryListForOrder.js";
import { renderSearchBar } from "../../../components/searchBar/searchBar.js";
import { addItemsFilters } from "./addItemsFilter.js";
import { renderDishCardWithAdd } from "../../../components/dish/dishCard/DishCardWithAdd.js";
import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { updateOrder } from "../../../services/order/updateOrder.js";

export async function openAddItemsModal(orderId, onAddedCallback) {
  const modalContent = `
    <div class="menu-view add-items-modal" id="add-items-modal">
      <div id="category-list" class="category-list"></div>
      <div id="category-description" class="category-description">
        Mostrando todos los platos disponibles.
      </div>
      <div id="search-sort-wrapper" class="search-sort-wrapper"></div>
      <div id="dish-list" class="dish-list"></div>
      <div id="pagination-container" class="pagination-container"></div>
    </div>
  `;

  const overlay = createModal(modalContent, `Agregar platos a la orden #${orderId}`);

  await renderCategoryListForOrder(overlay, orderId, onAddedCallback);
  setupAddItemsHeader(overlay, orderId, onAddedCallback);
  await renderDishListWithAdd(overlay, orderId, onAddedCallback);

  return overlay;
}

function setupAddItemsHeader(overlay, orderId, onAddedCallback) {
  const wrapper = overlay.querySelector("#search-sort-wrapper");

  const searchBar = renderSearchBar((term) => {
    addItemsFilters.setSearch(term);
    updateDishList(overlay, orderId, onAddedCallback);
  });

  const sortSelect = document.createElement("select");
  sortSelect.classList.add("sort-select");
  sortSelect.innerHTML = `
    <option value="">Ordenar por precio</option>
    <option value="asc">Menor a mayor</option>
    <option value="desc">Mayor a menor</option>
  `;
  sortSelect.addEventListener("change", (e) => {
    addItemsFilters.setSort(e.target.value);
    updateDishList(overlay, orderId, onAddedCallback);
  });

  const row = document.createElement("div");
  row.classList.add("search-sort-container");
  row.appendChild(searchBar);
  row.appendChild(sortSelect);
  wrapper.appendChild(row);
}

async function updateDishList(overlay, orderId, onAddedCallback) {
  const filters = addItemsFilters.get();
  await renderDishListWithAdd(overlay, orderId, onAddedCallback, filters);
}

export async function renderDishListWithAdd(overlay, orderId, onAddedCallback, filters = {}) {
  const list = overlay.querySelector("#dish-list");
  list.innerHTML = `<p>Cargando platos...</p>`;

  const dishes = await getAllDishes(filters);

  if (!dishes.length) {
    list.innerHTML = `<p>No hay platos disponibles.</p>`;
    return;
  }

  list.innerHTML = "";

  dishes.forEach((dish) => {
    const card = renderDishCardWithAdd(
      dish,
      async () => {
        const payload = {
          items: [{ id: dish.id, quantity: 1, notes: "" }],
        };

        try {
          await updateOrder(orderId, payload);
          if (onAddedCallback) await onAddedCallback();
        } catch (err) {
          console.error("[Add Item PUT Error]", err);
        }
      },
      { confirmBeforeAdd: true }
    );
    list.appendChild(card);
  });
}
