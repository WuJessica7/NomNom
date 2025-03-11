import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/Recipe";
import styles from "../styles/Recipes.module.scss";

const recipeItems = [
    { id: 1, chef: "Chef A", food: "Food A", image: "/79277308_l.png" },
    { id: 2, chef: "Chef B", food: "Food B", image: "/79277308_l.png" },
    { id: 3, chef: "Chef C", food: "Food C", image: "/79277308_l.png" },
    { id: 4, chef: "Chef D", food: "Food D", image: "/79277308_l.png" },
    { id: 5, chef: "Chef E", food: "Food E", image: "/79277308_l.png" },
    { id: 6, chef: "Chef F", food: "Food F", image: "/79277308_l.png" },
];

const Recipes = () => {
  const [search, setSearch] = useState("");

  const filteredItems = recipeItems.filter(
    (item) =>
      item.food.toLowerCase().includes(search.toLowerCase()) ||
      item.chef.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.recipes}>
      <h1>Recipes</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className={styles.recipes__grid}>
        {filteredItems.map((item) => (
          <RecipeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;