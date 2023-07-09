import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import NutritionLabel from "./nutritionLabel";
import './leftComponent.css';

const LeftComponent = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className='vh-100 root'>
            <Calendar onChange={setDate} value={date}/>
            <NutritionLabel/>
        </div>


    );
};

export default LeftComponent;
