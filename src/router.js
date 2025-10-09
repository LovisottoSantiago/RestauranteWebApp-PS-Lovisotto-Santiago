import { renderHome } from "./views/home/home.js";
import { renderMenu } from "./views/menu/menu.js";
import { renderMyCart } from "./views/cart/cart.js"

// Tabla de rutas
const routes = {
  "#/": renderHome,
  "#/menu": renderMenu,
  "#/cart": renderMyCart,
};

// Función router
export function router() {
  const path = window.location.hash || "#/";
  const render = routes[path];

  if (render) {
    render();
  } else {
    document.getElementById("app").innerHTML = `
      <h1>404 - Página no encontrada</h1>
      <a href="#/">Volver al inicio</a>
    `;
  }
}
