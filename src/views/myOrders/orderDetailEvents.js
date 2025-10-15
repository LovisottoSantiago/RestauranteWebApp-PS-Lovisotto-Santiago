export function attachOrderEvents(container, orderState, updateOrder, showToast) {
  const confirmBtn = container.querySelector("#confirm-btn");

  confirmBtn.addEventListener("click", async () => {
    const editableItems = orderState.items.filter(i => i.status.id !== 5);

    const payload = {
      items: editableItems.map(i => ({
        id: i.dishId,
        quantity: i.quantity,
        notes: i.notes || "",
      })),
    };

    try {
      const res = await updateOrder(orderState.orderNumber, payload);

      if (res) {
        showToast("Orden actualizada correctamente", "success");
        window.location.hash = "#/myOrders";
      } else {
        showToast("Orden actualizada (parcialmente)", "warning");
      }
    } catch (err) {
      const msg = err?.message?.toLowerCase?.() || "";
      if (msg.includes("cerrada")) {
        showToast("Algunos ítems no se modificaron por estar cerrados", "info");
      } else {
        showToast("Error al actualizar la orden", "error");
      }
    }
  });
}
