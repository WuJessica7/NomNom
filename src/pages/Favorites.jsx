import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Favorite from "../components/Favorite";
import styles from "../styles/Favorites.module.scss";

const initialFavoriteItems = [
    { id: 1, chef: "Chef A", food: "Food A", image: "/79277308_l.png" },
    { id: 2, chef: "Chef B", food: "Food B", image: "/79277308_l.png" },
    { id: 3, chef: "Chef C", food: "Food C", image: "/79277308_l.png" },
    { id: 4, chef: "Chef D", food: "Food D", image: "/79277308_l.png" },
    { id: 5, chef: "Chef E", food: "Food E", image: "/79277308_l.png" },
    { id: 6, chef: "Chef F", food: "Food F", image: "/79277308_l.png" },
];

const Favorites = () => {
    const [search, setSearch] = useState("");
    const [favoritesList, setFavoritesList] = useState(initialFavoriteItems);

    const filteredItems = favoritesList.filter(
        (item) =>
            item.food.toLowerCase().includes(search.toLowerCase()) ||
            item.chef.toLowerCase().includes(search.toLowerCase())
    );

    const removeFavoriteItem = (id) => {
        setFavoritesList((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className={styles.favorites}>
            <h1 className={styles.title}>Favorites</h1>
            <SearchBar search={search} setSearch={setSearch} />
            <div className={styles.favorites__grid}>
                {filteredItems.map((item) => (
                    <Favorite key={item.id} item={item} removeFavoriteItem={removeFavoriteItem} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;