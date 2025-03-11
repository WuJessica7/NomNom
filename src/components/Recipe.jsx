import React, { useState } from "react";
import styles from "./Recipe.module.scss";

const Recipe = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.food} className={styles.image} />
      <button className={styles.favoriteButton} onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <div className={styles.cardBottom}>
        <h4 className={styles.chefName}>{item.chef}</h4>
        <p className={styles.foodName}>{item.food}</p>
      </div>
    </div>
  );
};

export default Recipe;