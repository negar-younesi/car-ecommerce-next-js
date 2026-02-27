const STORAGE_KEY = 'botocarOrders';

function safeParse(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getOrders() {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function getOrderById(orderId) {
  const orders = getOrders();
  return orders.find((o) => o.id === orderId) || null;
}

export function saveOrder(order) {
  if (typeof window === 'undefined') return;
  const orders = getOrders();
  const next = [order, ...orders];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearOrders() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
