export function renderNavbar() {
  const header = document.querySelector("header") || document.createElement("header");
  header.innerHTML = `
    <nav class="navbar">
      <a href="#/" class="logo">Lovi's</a>
      <ul class="nav-links">
        <li><a href="#/" data-route="#/">Inicio</a></li>
        <li><a href="#/menu" data-route="#/menu">Carta</a></li>
        <li><a href="#/cart" data-route="#/cart">Crear orden</a></li>
        <li><a href="#/myOrders" data-route="#/myOrders">Editar orden</a></li>
        <li><a href="#/adminLogin" data-route="#/adminLogin">Admin</a></li>
      </ul>
    </nav>
  `;

  if (!document.querySelector("header")) {
    document.body.prepend(header);
  }

  updateActiveLink();

  window.addEventListener("hashchange", updateActiveLink);
}

function updateActiveLink() {
  const currentHash = window.location.hash || "#/";
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    if (link.dataset.route === currentHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
