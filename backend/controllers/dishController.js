import Dish from "../models/dish.js";
import { param, body, query, validationResult } from "express-validator";

export const dishCreate = [
  // sanitize fields.
  body("userId").trim().notEmpty(),
  body("name").trim().default("unknown"),
  body("date").trim().isISO8601().toDate(),
  body("meal")
    .trim()
    .notEmpty()
    .isIn(["breakfast", "lunch", "dinner", "others"]),
  body("calories").trim().toFloat().default(0),
  body("carbs").trim().toFloat().default(0),
  body("protein").trim().toFloat().default(0),
  body("fat").trim().toFloat().default(0),

  async (req, res) => {
    // extract validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors. send them.
      res.status(400).json({ created: false, errors: errors.array() });
    } else {
      // create a Dish object with escaped and trimmed data.
      const dish = new Dish(req.body);

      // save the dish.
      dish
        .save()
        .then(() => res.json({ created: true, id: dish._id }))
        .catch((err) => res.status(500).json({ created: false, error: err }));
    }
  },
];

export const dishDelete = [
  // validate and sanitize fields.
  param("id").trim().notEmpty().isMongoId(),

  async (req, res) => {
    // extract validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors. send them.
      res.status(400).json({ deleted: false, errors: errors.array() });
    } else {
      // find and delete the dish.
      Dish.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deleted: true }))
        .catch((err) => res.status(500).json({ deleted: false, error: err }));
    }
  },
];

export const dishList = [
  // validate and sanitize fields.
  query("userId").trim().notEmpty(),
  query("date").trim().notEmpty().isISO8601().toDate(),
  query("meal")
    .trim()
    .notEmpty()
    .isIn(["whole day", "breakfast", "lunch", "dinner", "others"]),

  async (req, res) => {
    // extract validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors. send them.
      res.status(400).json({ status: "failed", errors: errors.array() });
    } else {
      // find dishes.
      let dishes;
      if (req.query.meal === "whole day") {
        dishes = await Dish.find({
          userId: req.query.userId,
          date: req.query.date,
        }).exec();
      } else {
        dishes = await Dish.find({ ...req.query }).exec();
      }

      // send dishes.
      res.json(dishes);
    }
  },
];

export const dishUpdate = [
  // validate and sanitize fields.
  param("id").trim().notEmpty().isMongoId(),

  body("name").optional().trim().notEmpty(),
  body("date").optional().trim().notEmpty().isISO8601().toDate(),
  body("meal")
    .optional()
    .trim()
    .notEmpty()
    .isIn(["whole day", "breakfast", "lunch", "dinner", "others"]),
  body("calories").optional().trim().toFloat(),
  body("carbs").optional().trim().toFloat(),
  body("protein").optional().trim().toFloat(),
  body("fat").optional().trim().toFloat(),

  async (req, res) => {
    // extract validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors. send them.
      res.status(400).json({ updated: false, errors: errors.array() });
    } else {
      // update the dish.
      Dish.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ updated: true }))
        .catch((err) => res.status(500).json({ updated: false, error: err }));
    }
  },
];
