import React, {useContext, useEffect, useState} from 'react';
import './NutritionLabel.css';
import {DishesContext} from "../context/dishesContext";
import {MEAL_CATEGORY} from "../constants/mealCategory";

const NutritionLabel = () => {
    const {dishes, dateSelected, mealSelected} = useContext(DishesContext);
    const [calories, setCalories] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);

    useEffect(() => {
        let totalCalories = 0;
        let totalFat = 0;
        let totalCarbs = 0;
        let totalProtein = 0;

        dishes.forEach(dish => {
            totalCalories += dish.calories;
            totalFat += dish.fat;
            totalCarbs += dish.carbs;
            totalProtein += dish.protein;
        });

        setCalories(totalCalories);
        setFat(totalFat);
        setCarbs(totalCarbs);
        setProtein(totalProtein);
    }, [dishes, dateSelected, mealSelected]);


    return (
        <div className="nutrition-label">
            <h2>
                {
                    mealSelected === MEAL_CATEGORY.WHOLE_DAY ? 'Daily' : mealSelected
                } intake
            </h2>
            <div className="nutrition-info">
                <div className="nutrition-row">
                    <span className="label">Calories:</span>
                    <span className="value">{calories}</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Fat:</span>
                    <span className="value">{fat}g</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Carbs:</span>
                    <span className="value">{carbs}g</span>
                </div>
                <div className="nutrition-row">
                    <span className="label">Protein:</span>
                    <span className="value">{protein}g</span>
                </div>
            </div>
        </div>
    );
};

export default NutritionLabel;
