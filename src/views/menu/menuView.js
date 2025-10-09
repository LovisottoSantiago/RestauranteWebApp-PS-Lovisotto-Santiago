export function renderMenuLayout() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="menu-view">
      <header class="menu-header">
        <h1>Nuestra Carta</h1>
        <p>Descubre nuestros platos y especialidades</p>
      </header>

      <div id="category-list" class="category-list"></div>
      <div id="category-description" class="category-description">
        Mostrando todos los platos disponibles.
      </div>

      <div id="search-sort-wrapper" class="search-sort-wrapper"></div>
      <div id="dish-list"></div>
    </section>
  `;
}
