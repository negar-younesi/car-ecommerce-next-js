import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Success.module.css';
import { useEffect, useState } from 'react';
import { getOrderById } from '../lib/orderStorage';

export default function SuccessPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    setOrder(getOrderById(String(orderId)));
    setIsReady(true);
  }, [orderId]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Order Successful</h1>
        <p>Your order has been placed successfully.</p>

        <div className={styles.meta}>
          <div>
            <span>Order ID</span>
            <strong>{orderId || '—'}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>Paid (Demo)</strong>
          </div>
        </div>

        {isReady && order ? (
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2>Summary</h2>
              <span>${Number(order.totalPrice).toLocaleString()}</span>
            </div>
            <div className={styles.summaryItems}>
              {order.items.map((it) => (
                <div key={it.id} className={styles.summaryRow}>
                  <span className={styles.summaryName}>{it.name} {it.model}</span>
                  <span className={styles.summaryQty}>x{it.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.actions}>
          <Link href="/orders" className={styles.secondaryButton}>
            View Orders
          </Link>
          <Link href="/cars" className={styles.primaryButton}>
            Continue Shopping
          </Link>
          <Link href="/" className={styles.ghostButton}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
