export const deliveryTypeLabels = {
  "Delivery": "Entrega a domicilio",
  "Take away": "Para llevar",
  "Dine in": "Comer en el restaurante"
};

export function mapDeliveryTypeName(typeName) {
  return deliveryTypeLabels[typeName] || typeName;
}
