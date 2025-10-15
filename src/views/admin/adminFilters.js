export function initAdminFilters(onFilterChange) {
  const fromNative = document.getElementById("from-date");
  const toNative = document.getElementById("to-date");
  const fromDisplay = document.getElementById("from-date-display");
  const toDisplay = document.getElementById("to-date-display");
  const statusFilter = document.getElementById("status-filter");

  function ymdToDmy(ymd) {
    if (!ymd) return "";
    const [y, m, d] = ymd.split("-");
    return `${d}/${m}/${y}`;
  }

  function nativeToISO(ymd) {
    if (!ymd) return null;
    const dt = new Date(`${ymd}T00:00:00`);
    return isNaN(dt.getTime()) ? null : dt.toISOString();
  }

  function syncDate(nativeInput, displayInput) {
    displayInput.value = ymdToDmy(nativeInput.value);
    triggerFilters();
  }

  function triggerFilters() {
    const filters = {
      status: statusFilter.value ? parseInt(statusFilter.value) : null,
      from: nativeToISO(fromNative.value),
      to: nativeToISO(toNative.value),
    };
    onFilterChange(false, filters);
  }

  fromNative.addEventListener("change", () => syncDate(fromNative, fromDisplay));
  toNative.addEventListener("change", () => syncDate(toNative, toDisplay));
  statusFilter.addEventListener("change", triggerFilters);
}
