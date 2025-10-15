import { renderHome } from "./views/home/home.js";
import { renderMenu } from "./views/menu/menu.js";
import { renderMyCart } from "./views/cart/cart.js";
import { renderAdminLogin } from "./views/admin/Login/adminLogin.js";
import { renderAdmin } from "./views/admin/admin.js";
import { renderMyOrders } from "./views/myOrders/myOrders.js";
import { renderOrderDetail } from "./views/myOrders/orderDetail.js";
import { showToast } from "./components/toast/toast.js";

export function router() {
  const hash = window.location.hash;

  const orderDetailMatch = hash.match(/^#\/order\/(\d+)$/);
  if (orderDetailMatch) {
    renderOrderDetail(orderDetailMatch[1]);
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

    case "#/admin": {
      const isAdmin = sessionStorage.getItem("isAdminLoggedIn") === "true";
      if (isAdmin) {
        renderAdmin();
      } else {
        showToast("Acceso denegado. Iniciá sesión primero.", "error");
        window.location.hash = "#/adminLogin";
      }
      break;
    }

    case "#/":
    default:
      renderHome();
      break;
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
