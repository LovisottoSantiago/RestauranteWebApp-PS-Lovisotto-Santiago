export function renderSearchBar(onSearch) {
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-bar-container');
  
  searchContainer.innerHTML = `
    <div class="search-bar">
      <input 
        type="text" 
        id="search-input" 
        class="search-input" 
        placeholder="Buscar platos por nombre..."
        autocomplete="off"
      />
      <button id="clear-search-btn" class="clear-btn" style="display: none;">×</button>
    </div>
  `;
  
  const input = searchContainer.querySelector('#search-input');
  const clearBtn = searchContainer.querySelector('#clear-search-btn');
  
  let debounceTimer;
  
  input.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    
    clearBtn.style.display = value ? 'block' : 'none';

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300);
  });
  
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    if (onSearch) {
      onSearch('');
    }
    input.focus();
  });
  
  return searchContainer;
}