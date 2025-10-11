export function renderAdminLogin() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="admin-login-view">
      <div class="admin-login-card">
        <h2>Modo Administrador</h2>
        <p>Ingresar contraseña para continuar:</p>        

        <div class="input-container">
          <input type="password" id="admin-login-input" placeholder="ej: proyectohardware" maxlength="40"/>
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

  cancelBtn.addEventListener("click", () => {
    window.location.hash = "#/";
  });

  submitBtn.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    if (value === "proyectosoftware") {
      localStorage.setItem("isAdminLoggedIn", "true"); 
      window.location.hash = "#/admin";
    } else {
      alert("Respuesta incorrecta");
      input.value = "";
      input.focus();
    }
  });

  toggle.addEventListener("click", () => {
    const isPassword = input.getAttribute("type") === "password";
    input.setAttribute("type", isPassword ? "text" : "password");

    if (isPassword) {
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
      toggle.title = "Ocultar contraseña";
    } else {
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
      toggle.title = "Mostrar contraseña";
    }
  });
}
