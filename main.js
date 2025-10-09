import { router } from "./src/router.js";
import { renderNavbar } from "./src/components/navbar/navbar.js";

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
renderNavbar();
