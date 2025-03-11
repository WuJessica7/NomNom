import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.scss";

const Profile = ({
  email,
  introduction,
  recipesCount,
  favoritesCount,
  ingredientsCount,
}) => {
  const navigate = useNavigate();
  const handleRecipesClick = () => {
    navigate("/recipes");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  const handleIngredientsClick = () => {
    navigate("/ingredients");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles.profile}>
        <h1 className={styles.profile__title}>Profile</h1>

        <input
          className={styles.profile__input}
          type="email"
          placeholder="Email"
          value={email}
          readOnly
        />
        <textarea
          className={styles.profile__input}
          placeholder="Introduction"
          value={introduction}
          readOnly
        />

        <div className={styles.profile__list}>
          <div
            className={styles["profile__list-item"]}
            onClick={handleRecipesClick}
          >
            <span className="item-label">Recipes</span>
            <span className="item-count">{recipesCount}</span>
            <FaArrowRight />
          </div>
          <div
            className={styles["profile__list-item"]}
            onClick={handleFavoritesClick}
          >
            <span className="item-label">Favorites</span>
            <span className="item-count">{favoritesCount}</span>
            <FaArrowRight />
          </div>
          <div
            className={styles["profile__list-item"]}
            onClick={handleIngredientsClick}
          >
            <span className="item-label">Ingredients</span>
            <span className="item-count">{ingredientsCount}</span>
            <FaArrowRight />
          </div>
        </div>

        <button className={styles["logout-button"]} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;