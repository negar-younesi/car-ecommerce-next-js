import styles from "./CarDetailes.module.css"
import Company from "../icons/Company";
import Location from "../icons/Location";
import Model from "../icons/Model";
import Money from "../icons/Money";
import Road from "../icons/Road";
import Calender from "../icons/Calender";
import CartButton from "../module/CartButton";
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';

function CarDetailes(props) {
  const router = useRouter();
  const { addItem } = useCart();
  const {
    id,
    name,
    model,
    year,
    distance,
    location,
    image,
    price,
    description,
  } = props;

  const buyNowHandler = () => {
    addItem(props);
    router.push('/checkout');
  };

  return (
    <div className={styles.container}>
      <img src={image} alt={`${name} ${model}`} className={styles.image} />
      <h3 className={styles.header}>
        {name} {model}
      </h3>
      <div className={styles.details}>
        <div>
          <Company />
          <p>Company</p>
          <span>{name}</span>
        </div>
        <div>
          <Model />
          <p>Model</p>
          <span>{model}</span>
        </div>
        <div>
          <Calender />
          <p>First registration</p>
          <span>{year}</span>
        </div>
        <div>
          <Road />
          <p>kms driven</p>
          <span>{Number(distance).toLocaleString()}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div>
          <Location />
          <p>Location</p>
          <span>{location}</span>
        </div>
      </div>
      <div className={styles.details}>
        <p className={styles.descriptionTitle}>Extra Information</p>
        <p className={styles.descriptionText}>{description}</p>
      </div>
      <div className={styles.details}>
        <div className={styles.price}>
          <Money />
          <p>Price:</p>
          <span>${price.toLocaleString()}</span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buyButton} onClick={buyNowHandler}>Buy Now</button>
        <CartButton car={props} />
      </div>
    </div>
  );
}

export default CarDetailes;