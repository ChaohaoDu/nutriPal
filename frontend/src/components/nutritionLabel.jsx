import React, { useContext, useEffect, useState } from "react";
import "./NutritionLabel.css";
import { DishesContext } from "../context/dishesContext";
import { MEAL_CATEGORY } from "../constants/mealCategory";

const NutritionLabel = () => {
  const { dishes, dateSelected, mealSelected, currentDish } =
    useContext(DishesContext);
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [mealName, setMealName] = useState("");

  useEffect(() => {
    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;

    if (!currentDish) {
      dishes.forEach((dish) => {
        totalCalories += dish.calories;
        totalFat += dish.fat;
        totalCarbs += dish.carbs;
        totalProtein += dish.protein;
      });

      setMealName(
        mealSelected === MEAL_CATEGORY.WHOLE_DAY ? "Daily" : mealSelected
      );
    } else {
      totalCalories = currentDish.calories;
      totalFat = currentDish.fat;
      totalCarbs = currentDish.carbs;
      totalProtein = currentDish.protein;

      setMealName(currentDish.name);
    }

    setCalories(totalCalories);
    setFat(totalFat);
    setCarbs(totalCarbs);
    setProtein(totalProtein);
  }, [dishes, dateSelected, mealSelected, currentDish]);

  const formatNumber = (num) => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(1);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="d-inline me-2">{`${mealName
          .charAt(0)
          .toUpperCase()}${mealName.slice(1)}`}</h2>
        <span className="d-inline">intake</span>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item nutrition-row">
          <span className="label">Calories:</span>
          <span className="value">{formatNumber(calories)} kcal</span>
        </li>
        <li className="list-group-item nutrition-row">
          <span className="label">Fat:</span>
          <span className="value">{formatNumber(fat)} g</span>
        </li>
        <li className="list-group-item nutrition-row">
          <span className="label">Carbs:</span>
          <span className="value">{formatNumber(carbs)} g</span>
        </li>
        <li className="list-group-item nutrition-row">
          <span className="label">Protein:</span>
          <span className="value">{formatNumber(protein)} g</span>
        </li>
      </ul>
    </div>

    //   <div className="nutrition-info">
    //     <div className="nutrition-row">
    //       <span className="label">Calories:</span>
    //       <span className="value">{formatNumber(calories)} kcal</span>
    //     </div>
    //     <div className="nutrition-row">
    //       <span className="label">Fat:</span>
    //       <span className="value">{formatNumber(fat)} g</span>
    //     </div>
    //     <div className="nutrition-row">
    //       <span className="label">Carbs:</span>
    //       <span className="value">{formatNumber(carbs)} g</span>
    //     </div>
    //     <div className="nutrition-row">
    //       <span className="label">Protein:</span>
    //       <span className="value">{formatNumber(protein)} g</span>
    //     </div>
    //   </div>
  );
};

export default NutritionLabel;
