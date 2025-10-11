import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { renderDishCardWithAdd } from "../../../components/dish/dishCard/DishCardWithAdd.js";
import { addDishToOrder } from "./orderActions.js";

export async function renderDishListWithAdd(overlay, orderId, filters = {}) {
  const container = overlay.querySelector("#dish-list");
  container.innerHTML = `<p>Cargando platos...</p>`;

  try {
    const dishes = await getAllDishes(filters);

    if (!Array.isArray(dishes) || dishes.length === 0) {
      container.innerHTML = `<p>No se encontraron platos disponibles.</p>`;
      return;
    }

    container.innerHTML = "";
    dishes.forEach((dish) => {
      const card = renderDishCardWithAdd(dish, async (d) => {
        await addDishToOrder(d.id, overlay);
      });
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error al cargar platos:", err);
    container.innerHTML = `<p>Error al cargar los platos.</p>`;
  }
}
