import React, {useContext, useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import {AuthContext} from "../context/authContext";
import {DishesContext} from "../context/dishesContext";
import {
    createDish,
    deleteDish,
    editDish,
    getDishes,
} from "../services/dishService";
import Dropdown from "react-bootstrap/Dropdown";
import MealEntry from "./mealEntry";
import ChatBox from "./chatBox";
import askGpt from "../services/chatgptService";
import {MEAL_CATEGORY} from "../constants/mealCategory";
import MealNav from "./mealNav";
import {auth} from "../services/initFirebase";

const RightComponent = () => {
    const {dishes, setDishes, dateSelected, mealSelected, setMealSelected} =
        useContext(DishesContext);
    const {user} = useContext(AuthContext);
    useEffect(() => {
        setMealSelected(MEAL_CATEGORY.WHOLE_DAY);
    }, [dateSelected, setMealSelected]);

    useEffect(() => {
        const findDishes = async () => {
            const allDishes = await getDishes(user.uid, dateSelected, mealSelected);
            setDishes(allDishes);
        };

        findDishes();
    }, [dateSelected, mealSelected, setDishes]);

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

    const logOut = () => {
        auth.signOut();
    };

    const askAndSave = async (message) => {
        const res = await askGpt(message);
        const getDish = JSON.parse(res.content);

        if (Array.isArray(getDish)) {
            const tempDishes = [];
            for (const dish of getDish) {
                const newDish = {
                    ...dish,
                    userId: user.uid,
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
                userId: user.uid,
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
        <div
            className="vh-100 d-flex flex-column p-4"
            style={{backgroundColor: "#ffffff"}}
        >
            <Row className="flex-grow-1">
                <Col>
                    <div className="mb-3 d-flex justify-content-between align-item-center">
                        <div className="align-item-center">
                            <MealNav/>
                        </div>

                        <Dropdown className="align-item-center">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {user.displayName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="w-100" onClick={logOut}>log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <hr style={{height: "2px", backgroundColor: "#949494"}}/>

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
        </div>
    );
};

export default RightComponent;
