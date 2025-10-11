import { createModal } from "../../../components/modal/modal.js";
import { renderCategoryList } from "../../../components/category/categoryList/categoryList.js";
import { renderSearchBar } from "../../../components/searchBar/searchBar.js";
import { addItemsFilters } from "./addItemsFilter.js";
import { renderDishCardWithAdd } from "../../../components/dish/dishCard/DishCardWithAdd.js";
import { showToast } from "../../../components/toast/toast.js";
import { API_BASE_URL, ENDPOINTS } from "../../../config/constants.js";
import { updateOrder } from "../../../services/order/updateOrder.js";

/**
 * Modal principal para agregar platos a una orden existente (PUT directo)
 */
export async function openAddItemsModal(orderId, onAddedCallback) {
  const modalContent = `
    <div class="menu-view add-items-modal" id="add-items-modal">
      <div id="category-list" class="category-list"></div>
      <div id="category-description" class="category-description">
        Mostrando todos los platos disponibles.
      </div>
      <div id="search-sort-wrapper" class="search-sort-wrapper"></div>
      <div id="dish-list" class="dish-list"></div>
    </div>
  `;

  const overlay = createModal(modalContent, `Agregar platos a la orden #${orderId}`);

  await renderCategoryList(overlay.querySelector("#category-list"));
  setupAddItemsHeader(overlay, orderId);
  await renderDishListWithAdd(overlay, orderId, onAddedCallback);

  return overlay;
}

/**
 * Renderiza la barra de búsqueda y ordenamiento
 */
function setupAddItemsHeader(overlay, orderId) {
  const wrapper = overlay.querySelector("#search-sort-wrapper");

  const searchBar = renderSearchBar((term) => {
    addItemsFilters.setSearch(term);
    updateDishList(overlay, orderId);
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

/**
 * Renderiza la lista de platos usando el componente renderDishCardWithAdd
 */
async function renderDishListWithAdd(overlay, orderId, onAddedCallback) {
  const list = overlay.querySelector("#dish-list");
  list.innerHTML = `<p>Cargando platos...</p>`;

  try {
    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.dishes}`);
    if (!res.ok) throw new Error("Error al obtener platos");
    const dishes = await res.json();

    list.innerHTML = "";
    dishes.forEach((dish) => {
      const card = renderDishCardWithAdd(dish, async () => {
        const confirmed = confirm(`¿Agregar "${dish.name}" a la orden?`);
        if (!confirmed) return;

        const payload = {
          items: [
            {
              id: dish.id,  // Dish UUID
              quantity: 1,
              notes: "",
            },
          ],
        };

        try {
          await updateOrder(orderId, payload);
          showToast(`"${dish.name}" agregado correctamente`, "success");
          if (onAddedCallback) await onAddedCallback();
        } catch (err) {
          console.error("[Add Item PUT Error]", err);
          showToast("Error al agregar plato", "error");
        }
      });

      list.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p>Error al cargar los platos.</p>`;
  }
}
