export function mapStatusToSpanish(id) {
  switch (id) {
    case 1: return "Pendiente";
    case 2: return "En preparación";
    case 3: return "Listo";
    case 4: return "En entrega";
    case 5: return "Cerrado";
    default: return "Desconocido";
  }
}
