export function showToast(message, type = 'success', duration = 2000) {
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${getIcon(type)}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('toast-show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      toast.remove();
    }, 300);
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