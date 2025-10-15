export function renderAdminLoginTemplate() {
  return `
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
}
