import Dish from "../../../backend/models/dish";
import mongoose from "mongoose";

export const createDish = (dish) => {
  return Dish.create(dish);
};

export const deleteDish = (id) => {
  return Dish.findByIdAndDelete(id);
};

export const getDishes = (userId, date) => {
  return Dish.find({ userId, date });
};

export const editDish = (id, dish) => {
  return Dish.findByIdAndUpdate(id, dish);
};
