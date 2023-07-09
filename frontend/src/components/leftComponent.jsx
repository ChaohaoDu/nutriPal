import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import NutritionLabel from "./nutritionLabel";
import './leftComponent.css';
import {DishesContext} from "../context/dishesContext";

const LeftComponent = () => {
    const {dateSelected, setDateSelected} = useContext(DishesContext);

    return (
        <div className='vh-100 root'>
            <Calendar onChange={setDateSelected} value={dateSelected}/>
            <NutritionLabel/>
        </div>
    );
};

export default LeftComponent;
