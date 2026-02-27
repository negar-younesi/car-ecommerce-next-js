import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Checkout.module.css';
import { useCart } from '../../components/context/CartContext';
import { saveOrder } from '../lib/orderStorage';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalCount, totalPrice, clear, isReady, notify } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderSummary = useMemo(() => {
    return items.map((x) => ({
      id: x.id,
      title: `${x.name} ${x.model}`,
      quantity: x.quantity,
      price: x.price,
      lineTotal: (Number(x.price) || 0) * (x.quantity || 0),
    }));
  }, [items]);

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) next.fullName = 'Full name is required';

    const phone = form.phone.trim();
    if (!phone) next.phone = 'Phone is required';
    else if (!/^[0-9+\-\s]{8,}$/.test(phone)) next.phone = 'Phone is not valid';

    const email = form.email.trim();
    if (!email) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Email is not valid';

    if (!form.address.trim()) next.address = 'Address is required';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (items.length === 0) {
      notify('Your cart is empty', 'error');
      return;
    }

    const ok = validate();
    if (!ok) {
      notify('Please fix the form errors', 'error');
      return;
    }

    setIsSubmitting(true);

    const orderId = `${Date.now()}`;

    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      },
      items: items.map((x) => ({
        id: x.id,
        name: x.name,
        model: x.model,
        price: x.price,
        quantity: x.quantity,
        image: x.image,
      })),
      totalCount,
      totalPrice,
    };

    setTimeout(() => {
      saveOrder(order);
      clear();
      router.push(`/success?orderId=${orderId}`);
    }, 400);
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
        <div className={styles.headerLeft}>
          <h1>Checkout</h1>
          <p>Complete your order details</p>
        </div>
        <Link href="/cart" className={styles.backLink}>
          Back to Cart
        </Link>
      </header>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <h2>Your cart is empty</h2>
          <p>Add a car to your cart before checkout.</p>
          <Link href="/cars" className={styles.primaryButton}>
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>Order Summary</h2>
            <div className={styles.summaryList}>
              {orderSummary.map((x) => (
                <div key={x.id} className={styles.summaryRow}>
                  <div className={styles.summaryTitle}>
                    <span className={styles.summaryName}>{x.title}</span>
                    <span className={styles.summaryMeta}>Qty: {x.quantity}</span>
                  </div>
                  <div className={styles.summaryPrice}>${x.lineTotal.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className={styles.summaryFooter}>
              <div className={styles.summaryTotals}>
                <div>
                  <span>Items</span>
                  <span>{totalCount}</span>
                </div>
                <div>
                  <span>Total</span>
                  <span className={styles.totalPrice}>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2>Customer Info</h2>
            <form onSubmit={submit} className={styles.form}>
              <label className={styles.field}>
                <span>Full Name</span>
                <input value={form.fullName} onChange={onChange('fullName')} />
                {errors.fullName ? <small className={styles.error}>{errors.fullName}</small> : null}
              </label>

              <label className={styles.field}>
                <span>Phone</span>
                <input value={form.phone} onChange={onChange('phone')} />
                {errors.phone ? <small className={styles.error}>{errors.phone}</small> : null}
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input value={form.email} onChange={onChange('email')} />
                {errors.email ? <small className={styles.error}>{errors.email}</small> : null}
              </label>

              <label className={styles.field}>
                <span>Address</span>
                <textarea rows={4} value={form.address} onChange={onChange('address')} />
                {errors.address ? <small className={styles.error}>{errors.address}</small> : null}
              </label>

              <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>

              <p className={styles.hint}>
                This is a demo checkout flow for portfolio purposes.
              </p>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
