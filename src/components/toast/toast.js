// components/toast/toast.js

export function showToast(message, type = 'success', duration = 3000) {
  // Crear el toast
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${getIcon(type)}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;
  
  // Agregar al body
  document.body.appendChild(toast);
  
  // Animación de entrada
  setTimeout(() => {
    toast.classList.add('toast-show');
  }, 10);
  
  // Remover después del tiempo especificado
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      toast.remove();
    }, 300); // Esperar a que termine la animación
  }, duration);
}

function getIcon(type) {
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };
  return icons[type] || icons.info;
}