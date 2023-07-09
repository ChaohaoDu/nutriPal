import Dish from "../models/dish";
import mongoose from "mongoose";

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.REACT_APP_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

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
