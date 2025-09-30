import { API_BASE_URL, ENDPOINTS } from "../../../config/constants.js";

export const dishService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.dishes}`);
    if (!res.ok) throw new Error("Error cargando platos");
    return res.json();
  }
};
