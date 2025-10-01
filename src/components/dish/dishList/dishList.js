import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { renderDishCard } from "../dishCard/dishCard.js";

export async function renderDishList(filters = {}) {
  try {
    const dishes = await getAllDishes(filters);
    console.log("Platos obtenidos:", dishes);

    const container = document.getElementById("dish-list");
    if (!container) {
      console.error("No se encontró el contenedor #dish-list");
      return;
    }

    container.innerHTML = "";

    if (!dishes.length) {
      container.innerHTML = `<p>No se encontraron platos para esta búsqueda.</p>`;
      return;
    }

    dishes.forEach(dish => {
      const card = renderDishCard(dish);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al renderizar la lista de platos:", error);
  }
}