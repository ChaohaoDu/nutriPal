import React, { useState } from "react";
import askGpt from "../services/chatgptService";
import { MEAL_CATEGORY } from "../constants/mealCategory";
import { createDish } from "../services/dishService";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const userId = 1;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askGpt(message).then((res) => {
      const dishes = JSON.parse(res.content);
      dishes.forEach((dish) => {
        const newDish = {
          ...dish,
          userId,
          date: new Date(),
          meal: MEAL_CATEGORY.BREAKFAST,
        };
        createDish(newDish);
      });
    });
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
