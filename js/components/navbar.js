export function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
      <h1 class="logo">Mi Restaurante</h1>
      <ul class="nav-links">
        <li><a href="#/">Inicio</a></li>
        <li><a href="#/catalog">Catálogo</a></li>
      </ul>
    </nav>
  `;
}
