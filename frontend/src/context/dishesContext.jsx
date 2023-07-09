import React, {createContext, useState} from 'react';
import {MEAL_CATEGORY} from "../constants/mealCategory";

export const DishesContext = createContext();

export const DishesProvider = ({children}) => {
    const [dishes, setDishes] = useState([]);
    const [dateSelected, setDateSelected] = useState(new Date());
    const [mealSelected, setMealSelected] = useState(MEAL_CATEGORY.WHOLE_DAY);

    return (
        <DishesContext.Provider
            value={{dishes, setDishes, dateSelected, setDateSelected, mealSelected, setMealSelected}}>
            {children}
        </DishesContext.Provider>
    );
};
