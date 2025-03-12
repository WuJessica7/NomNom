import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Favorite from "./Favorite";
import styles from "./Favorites.module.scss";
import { NavigationBar } from "./NavigationBars";

const initialFavoriteItems = [
    { id: 1, chef: "Chef A", food: "Food A", image: "Food_Image.png" },
    { id: 2, chef: "Chef B", food: "Food B", image: "Food_Image.png" },
    { id: 3, chef: "Chef C", food: "Food C", image: "Food_Image.png" },
    { id: 4, chef: "Chef D", food: "Food D", image: "Food_Image.png" },
    { id: 5, chef: "Chef E", food: "Food E", image: "Food_Image.png" },
    { id: 6, chef: "Chef F", food: "Food F", image: "Food_Image.png" },
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
            <NavigationBar screen_name="Favorites" />
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