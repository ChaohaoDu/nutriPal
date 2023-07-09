import React, {useContext, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import MealEntry from "./mealEntry";
import ChatBox from "./chatBox";
import {MEAL_CATEGORY} from "../constants/mealCategory";
import {DishesContext} from "../context/dishesContext";

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

const RightComponent = () => {
    const [activeButton, setActiveButton] = useState(MEAL_CATEGORY.WHOLE_DAY);
    const {dishes, setDishes, dateSelected, setDateSelected, mealSelected, setMealSelected} = useContext(DishesContext);

    useEffect(() => {
        setMealSelected(MEAL_CATEGORY.WHOLE_DAY);
        console.log('rightComponent useEffect')
    }, [mealSelected, dishes, dateSelected]);


    const onMealEntryDelete = () => {
        console.log('delete');
    }

    const onMealEntryEdit = () => {
        console.log('edit');
    };

    return (
        <Container
            className="vh-100 d-flex flex-column"
            style={{backgroundColor: "#ffc107"}}
        >
            <Row className="flex-grow-1">
                <Col>
                    <MealNav
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}
                    />
                    {dishes.map((dish) =>
                        <MealEntry key={dish._id} dish={dish} onDelete={onMealEntryDelete} onEdit={onMealEntryEdit}/>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <ChatBox/>
                </Col>
            </Row>
        </Container>
    );
};

export default RightComponent;
