import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import MealEntry from "./mealEntry";
import ChatBox from "./chatBox";
import { MEAL_CATEGORY } from "../constants/mealCategory";
import { getDishes } from "../services/dishService";

const MealNav = ({ activeButton, setActiveButton }) => {
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(buttonName);
  };

  return (
    <ButtonGroup>
      {Object.values(MEAL_CATEGORY).map((buttonName) => (
        <Button
          key={buttonName}
          variant={activeButton === buttonName ? "primary" : "secondary"}
          onClick={() => handleClick(buttonName)}
        >
          {buttonName}
        </Button>
      ))}
    </ButtonGroup>
  );
};

const RightComponent = () => {
  const [activeButton, setActiveButton] = useState(MEAL_CATEGORY.WHOLE_DAY);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getDishes(1, new Date()).then((res) => {
      setDishes(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Container
      className="vh-100 d-flex flex-column"
      style={{ backgroundColor: "#ffc107" }}
    >
      <Row className="flex-grow-1">
        <Col>
          <MealNav
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          {dishes.map((dish) => {
            <MealEntry dish={dish} key={dish._id}/>;
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <ChatBox />
        </Col>
      </Row>
    </Container>
  );
};

export default RightComponent;
