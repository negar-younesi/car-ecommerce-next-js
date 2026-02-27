import styles from './CartIcon.module.css';
import Cart from '../icons/Cart';

function CartIcon({ itemCount }) {
  return (
    <div className={styles.container}>
      <Cart />
      {itemCount > 0 && (
        <span className={styles.badge}>{itemCount > 99 ? '99+' : itemCount}</span>
      )}
    </div>
  );
}

export default CartIcon;
