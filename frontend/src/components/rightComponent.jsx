import React, {useContext, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import MealEntry from "./mealEntry";
import ChatBox from "./chatBox";
import {MEAL_CATEGORY} from "../constants/mealCategory";
import {DishesContext} from "../context/dishesContext";
import {deleteDish, getDishes} from "../services/dishService";
import {AuthContext} from "../context/authContext";

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
    const {dishes, setDishes, dateSelected, mealSelected, setMealSelected} = useContext(DishesContext);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        setMealSelected(MEAL_CATEGORY.WHOLE_DAY);
    }, [dateSelected]);

    useEffect(() => {
        const finDishes = async () => {
            const allDishes = await getDishes(user.id, dateSelected, mealSelected);
            console.log(allDishes);
            setDishes(allDishes);
        }

        finDishes();
        // setDishes(allDishes)
    }, [mealSelected, dateSelected])


    const onMealEntryDelete = async (id) => {
        try {
            console.log(id)
            await deleteDish(id);
            setDishes((prevDishes) => prevDishes.filter(dish => dish._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                    {dishes.map((dish, index) =>
                        <MealEntry
                            key={index}
                            dish={dish}
                            onDelete={() => onMealEntryDelete(dish._id)}
                            onEdit={onMealEntryEdit}
                        />
                    )}
                </Col>
            </Row>

            {
                mealSelected !== MEAL_CATEGORY.WHOLE_DAY &&
                <Row>
                    <Col>
                        <ChatBox/>
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default RightComponent;
