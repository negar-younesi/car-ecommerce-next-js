import Link from 'next/link';
import styles from './CartItem.module.css';

function CartItem({ car, onIncrease, onDecrease, onRemove }) {
  return (
    <div className={styles.container}>
      <Link href={`/cars/${car.id}`}>
        <img src={car.image} alt={`${car.name} ${car.model}`} className={styles.image} />
      </Link>
      
      <div className={styles.details}>
        <Link href={`/cars/${car.id}`}>
          <h3 className={styles.title}>{car.name} {car.model}</h3>
        </Link>
        
        <div className={styles.info}>
          <p>{car.year}</p>
          <p>{Number(car.distance).toLocaleString()} km</p>
          <p>{car.location}</p>
        </div>
        
        <div className={styles.price}>
          <span>${car.price.toLocaleString()}</span>
        </div>

        <div className={styles.quantityRow}>
          <div className={styles.quantityControls}>
            <button
              className={styles.qtyButton}
              onClick={() => onDecrease(car.id)}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className={styles.quantity}>{car.quantity}</span>
            <button
              className={styles.qtyButton}
              onClick={() => onIncrease(car)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className={styles.lineTotal}>
            ${(car.price * car.quantity).toLocaleString()}
          </div>
        </div>
      </div>
      
      <button className={styles.removeButton} onClick={() => onRemove(car.id)}>
        ✕
      </button>
    </div>
  );
}

export default CartItem;
