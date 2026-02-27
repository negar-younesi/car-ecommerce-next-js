import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Orders.module.css';
import { clearOrders, getOrders } from '../lib/orderStorage';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setOrders(getOrders());
    setIsReady(true);
  }, []);

  const totalOrders = orders.length;

  const totalSpent = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
  }, [orders]);

  const clearAll = () => {
    clearOrders();
    setOrders([]);
  };

  if (!isReady) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Orders</h1>
          <p className={styles.subtitle}>Your order history (demo)</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/cars" className={styles.secondaryButton}>
            Browse Cars
          </Link>
          <button className={styles.dangerButton} onClick={clearAll} disabled={orders.length === 0}>
            Clear History
          </button>
        </div>
      </header>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <span>Total Orders</span>
          <strong>{totalOrders}</strong>
        </div>
        <div className={styles.statCard}>
          <span>Total Spent</span>
          <strong>${totalSpent.toLocaleString()}</strong>
        </div>
      </section>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <h2>No orders yet</h2>
          <p>Complete a checkout to see orders here.</p>
          <Link href="/cars" className={styles.primaryButton}>
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((o) => (
            <div key={o.id} className={styles.orderCard}>
              <div className={styles.orderTop}>
                <div>
                  <div className={styles.orderId}>Order #{o.id}</div>
                  <div className={styles.orderMeta}>
                    <span>{new Date(o.createdAt).toLocaleString()}</span>
                    <span>Items: {o.totalCount}</span>
                  </div>
                </div>
                <div className={styles.orderTotal}>${Number(o.totalPrice).toLocaleString()}</div>
              </div>

              <div className={styles.orderItems}>
                {o.items.slice(0, 3).map((it) => (
                  <div key={it.id} className={styles.itemRow}>
                    <span className={styles.itemName}>{it.name} {it.model}</span>
                    <span className={styles.itemQty}>x{it.quantity}</span>
                  </div>
                ))}
                {o.items.length > 3 ? (
                  <div className={styles.more}>+{o.items.length - 3} more</div>
                ) : null}
              </div>

              <div className={styles.orderActions}>
                <Link href={`/orders/${o.id}`} className={styles.linkButton}>
                  Order Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
