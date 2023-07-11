import React, { useState, useRef, useContext } from "react";
import { DishesContext } from "../context/dishesContext";
import "./mealEntry.css";

const MealEntry = ({ dish, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeal, setEditedMeal] = useState(dish.name);
  const { currentDish, setCurrentDish } = useContext(DishesContext);
  const inputRef = useRef(null);

  const onButtonEdit = async () => {
    await setIsEditing(true);
    focusOnInput();
  };
  const handleSelectDish = () => {
    if (currentDish === dish) {
      setCurrentDish(null);
    } else {
      setCurrentDish(dish);
    }
    console.log(currentDish);
  };
  const focusOnInput = () => {
    inputRef.current.focus();
  };

  const handleSave = () => {
    onEdit(dish._id, editedMeal);
    setIsEditing(false);
  };

  return (
    <div className="d-flex justify-content-between align-item-center mb-3">
      <div className="me-4" style={{ flex: 1 }}>
        {isEditing ? (
          <input
            ref={inputRef}
            className="entry-name form-control rounded-pill"
            type="text"
            value={editedMeal}
            onChange={(e) => setEditedMeal(e.target.value)}
          />
        ) : (
          <span
            className={`entry-name btn rounded-pill ${
              currentDish === dish ? "btn-primary" : "btn-light"
            }`}
            onClick={handleSelectDish}
            onFocus={handleSelectDish}
          >
            {dish.name}
          </span>
        )}
      </div>
      <div className="align-item-center">
        {isEditing ? (
          <>
            <button
              className="btn btn-secondary rounded-pill me-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-danger rounded-pill"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-secondary rounded-pill me-2"
              onClick={onButtonEdit}
            >
              Edit
            </button>
            <button className="btn btn-danger rounded-pill" onClick={onDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MealEntry;
