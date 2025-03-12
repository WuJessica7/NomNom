import React, { useState } from "react";
import styles from "./Activity.module.scss";
import SearchBar from "./SearchBar";

const activities = [
  { id: 1, chef: "Chef A", food: "Food A", image: "Food_Image.png", date: "03/10/2025" },
  { id: 2, chef: "Chef B", food: "Food B", image: "Food_Image.png", date: "03/11/2025" },
];

const Activity = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredItems = activities.filter((item) =>
    item.food.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.activity}>
      <h1 className={styles.title}>ACTIVITY</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <div className={styles.gridContainer}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.food} className={styles.image} />
              <button
                className={styles.heartButton}
                onClick={() => toggleFavorite(item.id)}
              >
                {favorites.includes(item.id) ? "❤️" : "🤍"}
              </button>
            </div>
            <div className={styles.info}>
              <p className={styles.foodName}>{item.food}</p>
              <p className={styles.foodDate}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;