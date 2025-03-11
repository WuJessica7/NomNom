import React, { useState } from "react";
import styles from "./Favorite.module.scss";

const Favorite = ({ item, removeFavoriteItem }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  const handleClick = () => {
    setIsFavorite(false);
    setTimeout(() => {
      removeFavoriteItem(item.id);
    }, 500);
  };

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.food} className={styles.image} />
      <div className={styles.cardInfo}>
        <div className={styles.textSection}>
          <h4 className={styles.chefName}>{item.chef}</h4>
          <p className={styles.foodName}>{item.food}</p>
        </div>
        <button className={styles.favoriteButton} onClick={handleClick}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default Favorite;