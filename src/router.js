import { renderHome } from "./views/home/home.js";
import { renderMenu } from "./views/menu/menu.js";
import { renderMyCart } from "./views/cart/cart.js";
import { renderAdminLogin } from "./views/admin/Login/adminLogin.js";
import { renderAdmin } from "./views/admin/admin.js"; 
import { renderMyOrders } from "./views/myOrders/myOrders.js"; 
import { renderOrderDetail } from "./views/myOrders/orderDetail.js";

export function router() {
  const hash = window.location.hash;

  // Rutas con parámetros
  const orderDetailMatch = hash.match(/^#\/order\/(\d+)$/);

  if (orderDetailMatch) {
    const orderId = orderDetailMatch[1];
    renderOrderDetail(orderId);
    return;
  }

  switch (hash) {
    case "#/menu":
      renderMenu();
      break;

    case "#/cart":
      renderMyCart();
      break;

    case "#/adminLogin":
      renderAdminLogin();
      break;

    case "#/myOrders":
      renderMyOrders();
      break;

    case "#/admin":
      const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
      if (isAdmin) {
        renderAdmin();
      } else {
        alert("Acceso denegado — Tenés que iniciar sesión primero");
        window.location.hash = "#/adminLogin";
      }
      break;

    case "#/":
    default:
      renderHome();
      break;
  }
}
