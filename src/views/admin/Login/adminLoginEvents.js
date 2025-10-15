import { showToast } from "../../../components/toast/toast.js";
import { hashPassword } from "./hashUtils.js";

export function setupAdminLoginEvents() {
  const cancelBtn = document.getElementById("admin-login-cancel");
  const submitBtn = document.getElementById("admin-login-submit");
  const input = document.getElementById("admin-login-input");
  const toggle = document.getElementById("toggle-password");
  const eyeIcon = document.getElementById("eye-icon");

  const VALID_HASH = "ef4af5f4d645075f05af10baca4a9b2e0867722eb894dc09b5041c42c1d3ab48";

  cancelBtn.addEventListener("click", () => {
    window.location.hash = "#/";
  });

  toggle.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
    toggle.title = isPassword ? "Ocultar contraseña" : "Mostrar contraseña";
  });

  submitBtn.addEventListener("click", async () => {
    const value = input.value.trim().toLowerCase();

    if (!value) {
      showToast("Debe ingresar una contraseña", "warning");
      return;
    }

    const hashed = await hashPassword(value);

    if (hashed === VALID_HASH) {
      sessionStorage.setItem("isAdminLoggedIn", "true");
      showToast("Acceso concedido", "success");
      window.location.hash = "#/admin";
    } else {
      showToast("Contraseña incorrecta", "error");
      input.value = "";
      input.focus();
    }
  });
}
