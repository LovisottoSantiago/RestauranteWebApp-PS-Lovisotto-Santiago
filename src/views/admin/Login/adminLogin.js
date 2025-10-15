import { renderAdminLoginTemplate } from "./adminLoginTemplate.js";
import { setupAdminLoginEvents } from "./adminLoginEvents.js";

export function renderAdminLogin() {
  const container = document.getElementById("app");
  container.innerHTML = renderAdminLoginTemplate();

  setupAdminLoginEvents();
}
