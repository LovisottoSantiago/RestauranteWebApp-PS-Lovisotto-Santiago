import { showToast } from "../../../components/toast/toast.js";

export function renderAdminLogin() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="admin-login-view">
      <div class="admin-login-card">
        <h2>Modo Administrador</h2>
        <p>Ingresar contraseña para continuar:</p>        

        <div class="input-container">
          <input 
            type="password" 
            id="admin-login-input" 
            placeholder="ej: proyectohardware" 
            maxlength="40"
            autocomplete="off"
          />
          <span id="toggle-password" class="eye-icon" title="Mostrar contraseña">
            <i class="fas fa-eye" id="eye-icon"></i>
          </span>
        </div>

        <p id="admin-login-hint">Pista: es el nombre de la materia.</p>

        <div class="admin-login-actions">
          <button id="admin-login-cancel">Cancelar</button>
          <button id="admin-login-submit">Ingresar</button>        
        </div>
      </div>
    </section>
  `;

  const cancelBtn = document.getElementById("admin-login-cancel");
  const submitBtn = document.getElementById("admin-login-submit");
  const input = document.getElementById("admin-login-input");
  const toggle = document.getElementById("toggle-password");
  const eyeIcon = document.getElementById("eye-icon");

  // Hash predefinido (sha256)
  const VALID_HASH = "ef4af5f4d645075f05af10baca4a9b2e0867722eb894dc09b5041c42c1d3ab48";

  // Cancelar: volver al inicio
  cancelBtn.addEventListener("click", () => {
    window.location.hash = "#/";
  });

  // Mostrar / ocultar contraseña
  toggle.addEventListener("click", () => {
    const isPassword = input.getAttribute("type") === "password";
    input.setAttribute("type", isPassword ? "text" : "password");

    if (isPassword) {
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
      toggle.title = "Ocultar contraseña";
    } else {
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
      toggle.title = "Mostrar contraseña";
    }
  });

  // Hashear con SHA-256
  async function hashPassword(str) {
    const buffer = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Validar contraseña
  submitBtn.addEventListener("click", async () => {
    const value = input.value.trim().toLowerCase();

    if (!value) {
      showToast("Debe ingresar una contraseña", "warning");
      return;
    }

    const hashed = await hashPassword(value);

    if (hashed === VALID_HASH) {
      sessionStorage.setItem("isAdminLoggedIn", "true"); // solo sesión actual
      showToast("Acceso concedido", "success");
      window.location.hash = "#/admin";
    } else {
      showToast("Contraseña incorrecta", "error");
      input.value = "";
      input.focus();
    }
  });
}
