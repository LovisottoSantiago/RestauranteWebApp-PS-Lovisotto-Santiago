import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { renderDishCardWithAdd } from "../dishCard/DishCardWithAdd.js";
import { addToCart } from "../../cart/utils/cartService.js";
import { renderPaginationControls } from "./paginationControls.js";

const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let allDishes = [];

export async function renderDishList(filters = {}) {
  const container = document.getElementById("dish-list");
  const paginationContainer = document.getElementById("pagination-controls");

  container.innerHTML = `<p>Cargando...</p>`;
  paginationContainer.innerHTML = "";

  allDishes = await getAllDishes(filters);

  if (allDishes.length === 0) {
    container.innerHTML = `<p class="no-results">No hay platos disponibles para esta categoría.</p>`;
    return;
  }

  renderCurrentPage();
}

function renderCurrentPage() {
  const container = document.getElementById("dish-list");
  const paginationContainer = document.getElementById("pagination-controls");

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visibleDishes = allDishes.slice(start, end);

  container.innerHTML = "";

  visibleDishes.forEach(dish => {
    const card = renderDishCardWithAdd(dish, (d) => {
      addToCart(d);
      console.log("Plato agregado:", d.name);
    });
    container.appendChild(card);
  });

  renderPaginationControls({
    currentPage,
    totalPages: Math.ceil(allDishes.length / ITEMS_PER_PAGE),
    onPageChange: (newPage) => {
      currentPage = newPage;
      renderCurrentPage();
    }
  });
}
