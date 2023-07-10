import React, {useContext} from "react";
import {DishesContext} from "../context/dishesContext";
import {Button, ButtonGroup} from "react-bootstrap";
import {MEAL_CATEGORY} from "../constants/mealCategory";

const MealNav = () => {
    const {mealSelected, setMealSelected} = useContext(DishesContext);

    const handleClick = (buttonName) => {
        setMealSelected(buttonName);
    };

    return (
        <ButtonGroup>
            {Object.values(MEAL_CATEGORY).map((buttonName) => (
                <Button
                    key={buttonName}
                    variant={mealSelected === buttonName ? "primary" : "secondary"}
                    onClick={() => handleClick(buttonName)}
                >
                    {buttonName}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default MealNav;
