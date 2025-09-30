import { addToOrder } from "../order/orderPanel.js";

export function createDishCard(dish) {
  const DEFAULT_IMAGE = "assets/img/default-dish.jpg";
  const imageSrc = dish.image && dish.image.trim() !== "" ? dish.image : DEFAULT_IMAGE;

  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${imageSrc}" alt="${dish.name}">
    <div class="product-info">
      <h3>${dish.name}</h3>
      <p>${dish.description ?? "Sin descripción"}</p>
      <p><strong>$${dish.price}</strong></p>
      <button class="add-to-cart">Agregar al carrito</button>
    </div>
  `;

  card.querySelector(".add-to-cart").addEventListener("click", () => {
    addToOrder(dish);
  });

  return card;
}
