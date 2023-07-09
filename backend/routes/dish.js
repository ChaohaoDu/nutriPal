import express from "express";
import {
  dishCreate,
  dishDelete,
  dishList,
  dishUpdate,
} from "../controllers/dishController.js";

const router = express.Router();

// GET request for list of all Dish items.
router.get("/", dishList);

// POST request for creating Dish.
router.post("/", dishCreate);

// PUT request to update Dish.
router.put("/:id", dishUpdate);

// DELETE request to delete Dish.
router.delete("/:id", dishDelete);

export default router;
