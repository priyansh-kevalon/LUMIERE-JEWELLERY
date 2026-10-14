/** Group orders by customer email with lifetime metrics (mirrors the admin UI). */
export function buildCustomers(orders, users) {
  const byEmail = new Map();

  const ensure = (email, profile = {}) => {
    const key = (email || 'guest@lumiere.local').toLowerCase();
    if (!byEmail.has(key)) {
      byEmail.set(key, {
        email: key,
        name: profile.name || key.split('@')[0],
        phone: profile.phone || '',
        createdAt: profile.createdAt || null,
        orders: 0,
        spend: 0,
        lastOrderAt: null,
      });
    }
    return byEmail.get(key);
  };

  for (const user of users) ensure(user.email, user);
  for (const order of orders) {
    const customer = ensure(order.customer?.email, order.customer);
    customer.orders += 1;
    customer.spend += order.total || 0;
    if (!customer.lastOrderAt || order.createdAt > customer.lastOrderAt) {
      customer.lastOrderAt = order.createdAt;
    }
  }

  return [...byEmail.values()].sort((a, b) => b.spend - a.spend);
}
