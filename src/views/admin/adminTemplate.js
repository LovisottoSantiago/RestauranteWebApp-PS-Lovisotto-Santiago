import { mapStatusToSpanish } from "../../components/statusMapper/statusMapper.js";

export function renderAdminTemplate() {
  const statusOptions = [1, 2, 3, 4, 5]
    .map(id => `<option value="${id}">${mapStatusToSpanish(id)}</option>`)
    .join("");

  return `
    <section class="admin-view">
      <div class="admin-header">
        <h2>Panel de Administración</h2>
        <button id="admin-logout">Cerrar sesión</button>
      </div>

      <div class="admin-filters">
        <div class="filter-group">
          <label for="status-filter">Estado:</label>
          <select id="status-filter">
            <option value="">Todas (excepto cerradas)</option>
            ${statusOptions}
          </select>
        </div>

        <div class="filter-group">
          <label>Desde:</label>
          <div class="date-field">
            <input type="text" id="from-date-display" class="date-display" placeholder="dd/mm/aaaa" readonly />
            <input type="date" id="from-date" class="date-native" />
            <button type="button" class="open-calendar" data-target="from-date" aria-label="Abrir calendario">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v1H1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm3 2v2h2V6H4zm3 0v2h2V6H7zm3 0v2h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="filter-group">
          <label>Hasta:</label>
          <div class="date-field">
            <input type="text" id="to-date-display" class="date-display" placeholder="dd/mm/aaaa" readonly />
            <input type="date" id="to-date" class="date-native" />
            <button type="button" class="open-calendar" data-target="to-date" aria-label="Abrir calendario">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v1H1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm3 2v2h2V6H4zm3 0v2h2V6H7zm3 0v2h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="admin-orders" class="admin-orders">
        <p>Cargando órdenes...</p>
      </div>
    </section>
  `;
}
