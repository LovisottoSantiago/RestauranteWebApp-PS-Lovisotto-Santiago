import { renderDishCard } from "./dishCard.js";
import { showToast } from "../../toast/toast.js";

export function renderDishCardWithAdd(dish, onAddToCart) {
  const card = renderDishCard(dish);
  card.classList.add("with-add");

  const actions = document.createElement("div");
  actions.classList.add("dish-actions");

  const btn = document.createElement("button");
  btn.classList.add("carrito-btn");
  btn.textContent = "Agregar a tu orden";

  btn.addEventListener("click", () => {    
    if (onAddToCart) onAddToCart(dish);
    
    showToast(`${dish.name} agregado al carrito`, 'success');
    
    btn.textContent = "Agregado";
    btn.classList.add("btn-added");
    
    setTimeout(() => {
      btn.textContent = "Agregar a tu orden";
      btn.classList.remove("btn-added");
    }, 2000);
  });

  const price = document.createElement("span");
  price.classList.add("price");
  price.textContent = `$${dish.price}`;

  actions.appendChild(btn);
  actions.appendChild(price);

  const content = card.querySelector(".dish-card-content");
  content.appendChild(actions);

  return card;
}
