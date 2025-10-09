import { createCartItemElement } from './cartItemView.js';
import { attachCartItemEvents } from './cartItemEvents.js';

export function renderCartItem(item, onRemove, onUpdateNotes, onUpdateQuantity) {
  const itemDiv = createCartItemElement(item);
  attachCartItemEvents(itemDiv, item, onRemove, onUpdateNotes, onUpdateQuantity);
  return itemDiv;
}
