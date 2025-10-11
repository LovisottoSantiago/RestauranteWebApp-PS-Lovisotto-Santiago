export function formatArgentineTime(inputDate) {
  if (!inputDate) return "Fecha no disponible";

  // Parseo seguro
  let date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  if (typeof inputDate === "string" && !inputDate.endsWith("Z") && !inputDate.includes("+")) {
    const utc = Date.parse(inputDate + "Z"); 
    date = new Date(utc);
  }

  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
