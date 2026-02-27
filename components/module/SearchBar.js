import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const router = useRouter();

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const searchHandler = () => {
    if (min && max) {
      const minPrice = Number(min);
      const maxPrice = Number(max);
      
      if (minPrice >= maxPrice) {
        alert("Minimum price must be less than maximum price!");
        return;
      }
      
      router.push(`/filter/${min}/${max}`);
    } else {
      alert("Please enter minimum and maximum price!");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="number"
          placeholder="Enter min-price"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter max-price"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      <button onClick={searchHandler}>Search</button>
    </div>
  );
}

export default SearchBar;
