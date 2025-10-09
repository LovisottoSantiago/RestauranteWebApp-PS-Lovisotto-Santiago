import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function getAllCategories() {
  const url = `${API_BASE_URL}${ENDPOINTS.categories}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error cargando categorías");
    return await response.json();
  } catch (error) {
    console.error("getAllCategories:", error);
    return [];
  }
}
