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
  proteins: { type: Number, required: true },
  fats: { type: Number, required: true },
});

export default model("Dish", dishSchema);
