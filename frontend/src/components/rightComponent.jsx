import React, {useContext, useEffect} from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {AuthContext} from "../context/authContext";
import {DishesContext} from "../context/dishesContext";
import {createDish, deleteDish, editDish, getDishes} from "../services/dishService";
import MealEntry from "./mealEntry";
import ChatBox from "./chatBox";
import askGpt from "../services/chatgptService";
import {MEAL_CATEGORY} from "../constants/mealCategory";
import MealNav from "./mealNav";

const RightComponent = () => {
    const {
        dishes,
        setDishes,
        dateSelected,
        mealSelected,
        setMealSelected,
    } = useContext(DishesContext);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        setMealSelected(MEAL_CATEGORY.WHOLE_DAY);
    }, [dateSelected, setMealSelected]);

    useEffect(() => {
        const findDishes = async () => {
            const allDishes = await getDishes(user.id, dateSelected, mealSelected);
            setDishes(allDishes);
        };

        findDishes();
    }, [dateSelected, mealSelected, setDishes, user.id]);

    const onMealEntryDelete = async (id) => {
        try {
            await deleteDish(id);
            setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const onMealEntryEdit = async (id, msg) => {
        const message = `i ate ${msg}`;
        const res = await askGpt(message);
        let tempDish = JSON.parse(res.content);
        console.log(tempDish)
        if (Array.isArray(tempDish)) {
            tempDish = tempDish[0];
        }
        const newDish = {
            ...tempDish,
            _id: id,
        };
        await editDish(id, newDish);
        setDishes((prevDishes) =>
            prevDishes.map((dish) => (dish._id === id ? newDish : dish))
        );
    };


    const askAndSave = async (message) => {
        const res = await askGpt(message);
        const getDish = JSON.parse(res.content);
        console.log(getDish)

        if (Array.isArray(getDish)) {
            const tempDishes = [];
            for (const dish of getDish) {
                const newDish = {
                    ...dish,
                    userId: user.id,
                    date: dateSelected,
                    meal: mealSelected,
                };
                const dishId = await createDish(newDish);
                tempDishes.push({...newDish, _id: dishId});
            }
            setDishes((prevDishes) => [...prevDishes, ...tempDishes]);
        } else if (typeof getDish === "object") {
            const newDish = {
                ...getDish,
                userId: user.id,
                date: dateSelected,
                meal: mealSelected,
            };
            const dishId = await createDish(newDish);
            const tempDish = {...newDish, _id: dishId};
            setDishes((prevDishes) => [...prevDishes, tempDish]);
        } else {
            console.error("Invalid data format for `getDish`");
        }
    };

    return (
        <Container className="vh-100 d-flex flex-column py-4" style={{backgroundColor: "#ffc107"}}>
            <Row className="flex-grow-1">
                <Col>
                    <div className="mb-3">
                        <MealNav/>
                    </div>
                    {dishes.map((dish) => (
                        <MealEntry
                            key={dish._id}
                            dish={dish}
                            onDelete={() => onMealEntryDelete(dish._id)}
                            onEdit={onMealEntryEdit}
                        />
                    ))}
                </Col>
            </Row>

            {mealSelected !== MEAL_CATEGORY.WHOLE_DAY && (
                <Row>
                    <Col>
                        <ChatBox onSubmit={askAndSave}/>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default RightComponent;
