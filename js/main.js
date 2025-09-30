import { router } from "./router.js";
import { renderNavbar } from "./components/navbar.js";

// Renderizar layout global
renderNavbar(document.querySelector("#navbar"));

// Cargar la vista inicial
window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
