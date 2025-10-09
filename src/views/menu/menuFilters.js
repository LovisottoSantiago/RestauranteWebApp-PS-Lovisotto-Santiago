let currentCategory = null;
let currentSearch = "";
let currentSort = "";

export const menuFilters = {
  setCategory(id) {
    currentCategory = id;
  },
  setSearch(term) {
    currentSearch = term ?? "";
  },
  setSort(order) {
    currentSort = order ?? "";
  },
  get() {
    const filters = {};
    if (currentCategory && currentCategory !== "all") filters.category = currentCategory;
    if (currentSearch) filters.name = currentSearch;
    if (currentSort) filters.sortByPrice = currentSort;
    return filters;
  }
};
