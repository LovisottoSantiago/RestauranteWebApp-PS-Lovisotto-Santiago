import { getAllCategories } from "../../../services/category/getAllCategories.js";
import { getAllDishes } from "../../../services/dish/getAllDishes.js";
import { addDishToOrder } from "./orderActions.js";

export let currentFilters = {
  name: "",
  category: null,
  sortByPrice: null,
};

export function initializeFilters() {
  currentFilters = { name: "", category: null, sortByPrice: null };
}

/* ===================== CATEGORÍAS ===================== */
export async function loadCategories(container, overlay, loadDishes) {
  container.innerHTML = `<p>Cargando categorías...</p>`;
  try {
    const categories = await getAllCategories();

    if (!Array.isArray(categories) || categories.length === 0) {
      container.innerHTML = `<p>No hay categorías disponibles.</p>`;
      return;
    }

    // Botón "Todas"
    container.innerHTML = `
      <button class="cat-btn ${currentFilters.category === null ? "active" : ""}" data-id="">Todas</button>
      ${categories.map(c => `<button class="cat-btn" data-id="${c.id}">${c.name}</button>`).join("")}
    `;

    // Asignar eventos a las categorías
    container.querySelectorAll(".cat-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        container.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilters.category = btn.dataset.id || null;
        await loadDishes(overlay);
      });
    });
  } catch (err) {
    console.error("Error al cargar categorías:", err);
    container.innerHTML = `<p>Error al cargar categorías.</p>`;
  }
}

/* ===================== BÚSQUEDA Y ORDEN ===================== */
export function setupSearchAndSort(wrapper, overlay, loadDishes) {
  wrapper.innerHTML = `
    <input type="text" id="dish-search" placeholder="Buscar plato..." />
    <select id="dish-sort">
      <option value="">Ordenar por precio</option>
      <option value="asc">Menor a mayor</option>
      <option value="desc">Mayor a menor</option>
    </select>
  `;

  const searchInput = wrapper.querySelector("#dish-search");
  const sortSelect = wrapper.querySelector("#dish-sort");

  searchInput.addEventListener("input", async (e) => {
    currentFilters.name = e.target.value.trim();
    await loadDishes(overlay);
  });

  sortSelect.addEventListener("change", async (e) => {
    currentFilters.sortByPrice = e.target.value || null;
    await loadDishes(overlay);
  });
}

/* ===================== CARGA DE PLATOS ===================== */
export async function loadDishes(overlay) {
  const container = overlay.querySelector("#dish-list");
  container.innerHTML = `<p>Cargando platos...</p>`;

  try {
    const filters = {
      name: currentFilters.name || undefined,
      category: currentFilters.category || undefined,
      sortByPrice: currentFilters.sortByPrice || undefined,
      onlyActive: true,
    };

    const dishes = await getAllDishes(filters);

    if (!Array.isArray(dishes) || dishes.length === 0) {
      container.innerHTML = `<p>No se encontraron platos.</p>`;
      return;
    }

    // Renderizado de platos
    container.innerHTML = dishes.map(d => `
      <div class="dish-card" data-id="${d.id}">
        <img src="${d.image || "https://via.placeholder.com/300x200?text=Plato"}" alt="${d.name}">
        <div class="dish-card-content">
          <h2>${d.name}</h2>
          <p>${d.description || ""}</p>
          <p class="price"><strong>$${d.price?.toFixed(2) || 0}</strong></p>
          <button class="btn-add-to-order" data-id="${d.id}">Agregar</button>
        </div>
      </div>
    `).join("");

    // Evento para botón "Agregar"
    container.querySelectorAll(".btn-add-to-order").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const dishId = e.target.dataset.id;
        await addDishToOrder(dishId, overlay);
      });
    });

  } catch (err) {
    console.error("Error cargando platos:", err);
    container.innerHTML = `<p>Error al cargar los platos.</p>`;
  }
}
