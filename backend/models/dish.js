import { Schema, model } from "mongoose";

const dishSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  meal: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "others"],
  },
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
});

export const Dish = model("Dish", dishSchema);
