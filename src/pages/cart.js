import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Cart.module.css';
import CartItem from '../../components/module/CartItem';
import CartIcon from '../../components/module/CartIcon';
import { useCart } from '../../components/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, totalCount, totalPrice, isReady, addItem, decreaseItem, removeItem, clear } = useCart();

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
        <Link href="/">
          <h1>🚗 BOTOCAR</h1>
        </Link>
        <CartIcon itemCount={totalCount} />
      </header>

      <main className={styles.main}>
        <h2>Shopping Cart ({totalCount} items)</h2>
        
        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty</p>
            <Link href="/cars" className={styles.shopButton}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  car={item} 
                  onIncrease={addItem}
                  onDecrease={decreaseItem}
                  onRemove={removeItem}
                />
              ))}
            </div>
            
            <div className={styles.summary}>
              <div className={styles.total}>
                <h3>Total: ${totalPrice.toLocaleString()}</h3>
              </div>
              <div className={styles.actions}>
                <Link href="/cars" className={styles.shopButton}>
                  Continue Shopping
                </Link>
                <button className={styles.clearButton} onClick={clear}>
                  Clear Cart
                </button>
                <button className={styles.checkoutButton} onClick={() => router.push('/checkout')}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
