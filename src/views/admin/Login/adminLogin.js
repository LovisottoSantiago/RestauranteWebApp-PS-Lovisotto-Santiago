// src/views/adminLogin/adminLogin.js
export function renderAdminLogin() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="admin-login-view">
      <div class="admin-login-card">
        <h2>Modo Administrador</h2>
        <p>Ingresar nombre de la materia en minúsculas para continuar:</p>

        <input type="password" id="admin-login-input" placeholder="ej: proyectohardware" maxlength="40" />

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

  cancelBtn.addEventListener("click", () => {
    window.location.hash = "#/"; 
  });

  submitBtn.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    if (value === "proyectosoftware") {
      window.location.hash = "#/admin"; // redirige a la vista admin
    } else {
      alert("Respuesta incorrecta");
      input.value = "";
      input.focus();
    }
  });
}
