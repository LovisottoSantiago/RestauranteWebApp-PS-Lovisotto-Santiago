import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { renderDishCardWithAdd } from "../dishCard/DishCardWithAdd.js";
import { addToCart } from "../utils/cart.js";

export async function renderDishList() {
  const dishes = await getAllDishes();
  const container = document.getElementById("dish-list");
  container.innerHTML = "";

  dishes.forEach(dish => {
    const card = renderDishCardWithAdd(dish, (d) => {
      addToCart(d);
      console.log("Plato agregado:", d.name);
      console.log("ID:", d.id);
    });
    container.appendChild(card);
  });
}
