import { API_BASE_URL, ENDPOINTS } from "../../config/constants.js";

export async function getAllDishes(filters = {}) {
  const url = new URL(`${API_BASE_URL}${ENDPOINTS.dishes}`);
  
  const finalFilters = {
    onlyActive: true,  
    ...filters        
  };
  
  Object.entries(finalFilters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "all") {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error cargando platos");
    return await response.json();
  } catch (error) {
    console.error("getAllDishes:", error);
    return [];
  }
}