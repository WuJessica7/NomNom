import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import { useAuth } from './context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [introduction, setIntroduction] = useState(user?.introduction || '');
  const [error, setError] = useState('');

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
    logout();
    navigate("/");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIntroduction(user?.introduction || '');
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          introduction
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update introduction');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Failed to update introduction. Please try again.');
    }
  };

  const handleCancel = () => {
    setIntroduction(user?.introduction || '');
    setIsEditing(false);
    setError('');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles["profile-container"]}>
      <div className={styles.profile}>
        <input
          className={styles.profile__input}
          type="email"
          placeholder="Email"
          value={user.email}
          readOnly
        />
        
        <div className={styles.introduction}>
          {isEditing ? (
            <>
              <textarea
                className={`${styles.profile__input} ${styles.introduction__textarea}`}
                placeholder="Write something about yourself..."
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
              <div className={styles.editButtons}>
                <button onClick={handleSave} className={styles.saveButton}>
                  Save
                </button>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className={styles.introductionDisplay}>
              <textarea
                className={`${styles.profile__input} ${styles.introduction__textarea}`}
                placeholder="Click Edit to add an introduction..."
                value={user.introduction || ''}
                readOnly
              />
              <button onClick={handleEditClick} className={styles.editButton}>
                Edit
              </button>
            </div>
          )}
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.profile__list}>
          <div
            className={styles["profile__list-item"]}
            onClick={handleRecipesClick}
          >
            <span className="item-label">Recipes</span>
            <span className="item-count">{user.recipes?.length || 0}</span>
            <FaArrowRight />
          </div>
          <div
            className={styles["profile__list-item"]}
            onClick={handleFavoritesClick}
          >
            <span className="item-label">Favorites</span>
            <span className="item-count">{user.favoriteRecipes?.length || 0}</span>
            <FaArrowRight />
          </div>
          <div
            className={styles["profile__list-item"]}
            onClick={handleIngredientsClick}
          >
            <span className="item-label">Ingredients</span>
            <span className="item-count">{user.personalIngredients?.length || 0}</span>
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