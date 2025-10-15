import { showToast } from "../../components/toast/toast.js";
import { renderAdminTemplate } from "./adminTemplate.js";
import { setupAdminEvents } from "./adminEvents.js";
import { initAdminFilters } from "./adminFilters.js";
import { loadOrders } from "./adminOrders.js";

let currentFilters = {};

export async function renderAdmin() {
  if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
    showToast("Acceso denegado. Iniciá sesión primero.", "error");
    window.location.hash = "#/adminLogin";
    return;
  }

  const container = document.getElementById("app");
  container.innerHTML = renderAdminTemplate();

  setupAdminEvents();

  initAdminFilters((isAutoRefresh, filters) => {
    currentFilters = filters;
    loadOrders(isAutoRefresh, currentFilters);
  });

  await loadOrders(false, currentFilters);

  setInterval(() => loadOrders(true, currentFilters), 3000);
}
