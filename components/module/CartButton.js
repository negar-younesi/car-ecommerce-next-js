import { useState } from 'react';
import styles from './CartButton.module.css';
import Cart from '../icons/Cart';
import { useCart } from '../context/CartContext';

function CartButton({ car }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    setIsAnimating(true);
    setIsAdded(true);
    
    // افزودن خودرو به سبد خرید
    addItem(car);
    
    // ریست کردن انیمیشن بعد از 1.5 ثانیه
    setTimeout(() => {
      setIsAnimating(false);
      setIsAdded(false);
    }, 1500);
  };

  return (
    <button 
      className={`${styles.button} ${isAdded ? styles.added : ''} ${isAnimating ? styles.animating : ''}`}
      onClick={handleAddToCart}
      disabled={isAnimating}
    >
      <Cart />
      <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
    </button>
  );
}

export default CartButton;
