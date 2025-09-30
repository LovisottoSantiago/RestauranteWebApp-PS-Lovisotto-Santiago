import { API_BASE_URL, ENDPOINTS } from "../../../config/constants.js";

export const categoryService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.categories}`);
    if (!res.ok) throw new Error("Error cargando categorías");
    return res.json();
  }
};
