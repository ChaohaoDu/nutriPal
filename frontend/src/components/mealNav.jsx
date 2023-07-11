import React, { useContext } from "react";
import { DishesContext } from "../context/dishesContext";
import { Button, ButtonGroup } from "react-bootstrap";
import { MEAL_CATEGORY } from "../constants/mealCategory";
import "./mealNav.css";

const MealNav = () => {
  const { mealSelected, setMealSelected } = useContext(DishesContext);

  const handleClick = (buttonName) => {
    setMealSelected(buttonName);
  };

  return (
    <ButtonGroup className="align-item-center">
      {Object.values(MEAL_CATEGORY).map((buttonName) => (
        <button
          className={`btn rounded-pill me-2 ${
            mealSelected === buttonName ? "btn-primary" : "btn-light"
          }`}
          key={buttonName}
          // variant={mealSelected   === buttonName ? "primary" : "secondary"}
          onClick={() => handleClick(buttonName)}
        >
          {buttonName}
        </button>
      ))}
    </ButtonGroup>
  );
};

export default MealNav;
