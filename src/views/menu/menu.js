import { renderMenuLayout } from "./menuView.js";
import { initMenuController, setCurrentCategoryFilter } from "./menuController.js";

export function renderMenu() {
  renderMenuLayout();
  initMenuController();
}

export { setCurrentCategoryFilter };
