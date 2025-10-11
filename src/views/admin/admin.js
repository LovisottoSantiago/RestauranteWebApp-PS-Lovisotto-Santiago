export function renderAdmin() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <section class="admin-view">
      <div class="admin-header">
        <h2>Panel de Administración</h2>
        <button id="admin-logout">Cerrar sesión</button>
      </div>
      <p>Bienvenido al modo administrador.</p>
    </section>
  `;

  document.getElementById("admin-logout").addEventListener("click", () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.hash = "#/";
  });
}
