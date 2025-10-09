import { getCart } from "./cartStorage.js";

export function notifyCartChange() {
  const event = new CustomEvent("cartUpdated", {
    detail: { cart: getCart() }
  });
  window.dispatchEvent(event);
}
