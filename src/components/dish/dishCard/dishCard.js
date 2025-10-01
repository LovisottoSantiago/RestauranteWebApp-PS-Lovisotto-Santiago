export function renderDishCard(dish) {
  const card = document.createElement("div");
  card.classList.add("dish-card");

  card.innerHTML = `
    <img src="${dish.image || 'https://via.placeholder.com/300x200?text=Plato'}" alt="${dish.name}">
    <div class="dish-card-content">
      <h2>${dish.name}</h2>
      <p>${dish.description}</p>
      <span class="price">$${dish.price}</span>
    </div>
  `;

  return card;
}
