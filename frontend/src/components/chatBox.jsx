import React, { useState, useContext } from "react";
import { DishesContext } from "../context/dishesContext";

const ChatBox = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const { mealSelected } = useContext(DishesContext);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <div>
      <div className="mb-1 ps-2 fs-6 fw-light" style={{ color: "grey" }}>
        What did you eat for {mealSelected}?
      </div>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          className="form-control"
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button class="btn btn-outline-secondary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
