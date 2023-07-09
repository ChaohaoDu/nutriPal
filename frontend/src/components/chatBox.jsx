import React, {useContext, useState} from "react";
import askGpt from "../services/chatgptService";
import {MEAL_CATEGORY} from "../constants/mealCategory";
import {createDish} from "../services/dishService";
import {AuthContext} from "../context/authContext";
import {DishesContext} from "../context/dishesContext";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const {user} = useContext(AuthContext);
    const {setDishes, mealSelected, dateSelected} = useContext(DishesContext);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await askGpt(message);
            const gptDish = JSON.parse(res.content);
            const tempDishes = [];
            for (const dish of gptDish) {
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
        } catch (error) {
            console.error('Error:', error);
        }
        setMessage("");
    };

    return (
        <div className="chatbox">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
