import React, {createContext, useState} from 'react';
import {MEAL_CATEGORY} from "../constants/mealCategory";

export const DishesContext = createContext();

export const DishesProvider = ({children}) => {
    const [dishes, setDishes] = useState([]);
    const [dateSelected, setDateSelected] = useState(new Date().toISOString());
    const [mealSelected, setMealSelected] = useState(MEAL_CATEGORY.WHOLE_DAY);
    const [currentDish, setCurrentDish] = useState(null);

    return (
        <DishesContext.Provider
            value={{dishes, setDishes, dateSelected, setDateSelected, mealSelected, setMealSelected, currentDish, setCurrentDish}}>
            {children}
        </DishesContext.Provider>
    );
};
