export function renderDishCard(dish) {
  const card = document.createElement("div");
  card.classList.add("dish-card");

  const defaultImage = "/src/assets/images/img-not-found.jpg";

  card.innerHTML = `
    <img src="${dish.image || defaultImage}" alt="${dish.name}" onerror="this.onerror=null; this.src='${defaultImage}';" />
    <div class="dish-card-content">
      <h2>${dish.name}</h2>
      <p>${dish.description}</p>
    </div>
  `;

  return card;
}
