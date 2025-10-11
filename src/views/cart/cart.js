import { renderCart } from "../../components/cart/cartComponent.js";

export function renderMyCart() {
  const container = document.getElementById("app");
  container.innerHTML = "";
  container.appendChild(renderCart());
}
