import { renderHome } from "./views/homeView.js";
import { renderCatalog } from "./views/catalogView.js";

const routes = {
  "/": renderHome,
  "/catalog": renderCatalog
};

export function router() {
  const path = location.hash.slice(1) || "/";
  const view = routes[path] || renderHome;

  const app = document.querySelector("#app"); 
  view(app);
}
