import { showToast } from "../../components/toast/toast.js";

export function setupAdminEvents() {
  document.getElementById("admin-logout").addEventListener("click", () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    showToast("Sesión cerrada", "info");
    window.location.hash = "#/adminLogin";
  });

  document.querySelectorAll(".open-calendar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target?.showPicker) target.showPicker();
      else target?.click();
    });
  });
}
