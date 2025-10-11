import { getCart, saveCart } from "./cartStorage.js";
import { notifyCartChange } from "./cartEvents.js";

function persist(cart) {
  saveCart(cart);
  notifyCartChange();
}

export function addToCart(dish, quantity = 1, notes = "") {
  const cart = getCart();
  const existing = cart.find(item => item.id === dish.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
      notes: notes || ""
    });
  }

  persist(cart);
  return cart;
}

export function updateItemNotes(dishId, notes) {
  const cart = getCart();
  const item = cart.find(item => item.id === dishId);
  if (item) {
    item.notes = notes;
    persist(cart);
  }
}

export function updateItemQuantity(dishId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === dishId);
  if (!item) return cart;

  item.quantity = quantity;
  persist(cart);
  return cart;
}

export function removeFromCart(dishId) {
  const cart = getCart().filter(item => item.id !== dishId);
  persist(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem("cart");
  notifyCartChange();
}
