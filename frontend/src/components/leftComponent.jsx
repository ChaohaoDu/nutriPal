import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Calendar from "react-calendar";
import "./calendar.css";
import NutritionLabel from "./nutritionLabel";
import "./leftComponent.css";
import { DishesContext } from "../context/dishesContext";

const LeftComponent = () => {
  const { dateSelected, setDateSelected } = useContext(DishesContext);

  const onChange = (date) => {
    setDateSelected(date.toISOString());
  };

  return (
    <div className="vh-100 root">
      {/* <div className="card"> */}
        {/* <div className="card-body" style={{ margin: 0, padding: 0 }}> */}
          <Calendar
            className="rounded"
            onChange={(date) => onChange(date)}
            value={dateSelected}
          />
        {/* </div> */}
      {/* </div> */}

      <NutritionLabel />
    </div>
  );
};

export default LeftComponent;
