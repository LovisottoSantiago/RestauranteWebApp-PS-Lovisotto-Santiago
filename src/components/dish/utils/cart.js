// utils/cart.js

const CART_KEY = "cart";

// Obtener carrito (desde localStorage o vacío)
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Guardar carrito
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Agregar un plato
export function addToCart(dish, quantity = 1, notes = "") {
  const cart = getCart();

  // Buscar si ya está en el carrito
  const existing = cart.find(item => item.id === dish.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
      notes
    });
  }

  saveCart(cart);
  return cart;
}

// Vaciar carrito
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
