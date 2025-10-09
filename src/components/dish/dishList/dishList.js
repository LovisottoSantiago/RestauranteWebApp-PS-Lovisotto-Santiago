import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { renderDishCardWithAdd } from "../dishCard/DishCardWithAdd.js";
import { addToCart } from "../../cart/utils/cartService.js";

export async function renderDishList(filters = {}) {
  const dishes = await getAllDishes(filters);
  const container = document.getElementById("dish-list");
  container.innerHTML = "";

  if (dishes.length === 0) {
    container.innerHTML = `<p class="no-results">No hay platos disponibles para esta categoría.</p>`;
    return;
  }

  dishes.forEach(dish => {
    const card = renderDishCardWithAdd(dish, (d) => {
      addToCart(d);
      console.log("Plato agregado:", d.name);
    });
    container.appendChild(card);
  });
}
