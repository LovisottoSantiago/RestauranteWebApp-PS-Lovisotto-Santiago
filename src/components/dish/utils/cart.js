// components/dish/utils/cart.js
const CART_KEY = "cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyCartChange();
}

function notifyCartChange() {
  const event = new CustomEvent('cartUpdated', { 
    detail: { cart: getCart() } 
  });
  window.dispatchEvent(event);
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
  
  saveCart(cart);
  return cart;
}

// ⬇️ Nueva función para actualizar notas
export function updateItemNotes(dishId, notes) {
  const cart = getCart();
  const item = cart.find(item => item.id === dishId);
  
  if (item) {
    item.notes = notes;
    saveCart(cart);
  }
}

export function removeFromCart(dishId) {
  const cart = getCart().filter(item => item.id !== dishId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  notifyCartChange();
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}