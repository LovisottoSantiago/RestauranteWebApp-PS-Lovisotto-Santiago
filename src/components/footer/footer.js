export function renderFooter() {
  const footer = document.querySelector("footer") || document.createElement("footer");
  footer.classList.add("app-footer");

  footer.innerHTML = `
    <div class="footer-content">
      <p>&copy; 2023 Lovi's Restaurant Proyecto Software.</p>
      <div class="footer-links">
        <a href="https://github.com/LovisottoSantiago/Restaurante_PS_Lovisotto_Santiago" target="_blank" rel="noopener noreferrer">Repositorio Backend</a>
        |
        <a href="https://github.com/LovisottoSantiago/RestauranteWebApp-PS-Lovisotto-Santiago" target="_blank" rel="noopener noreferrer">Repositorio Frontend</a>
      </div>
    </div>
  `;

  if (!document.querySelector("footer")) {
    document.body.appendChild(footer);
  }
}
