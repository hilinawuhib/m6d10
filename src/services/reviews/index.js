import express from "express";
import ReviewModel from "./schema.js";
import createHttpError from "http-errors";

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});
reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await ReviewModel.findById(reviewId);
    if (review) {
      res.send(review);
    } else {
      next(createHttpError(404, `review with id ${reviewId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
reviewsRouter.post("/", async (req, res, next) => {
  try {
    const newReview = new ReviewModel(req.body);
    const { _id } = await newReview.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedReview) {
      res.send(updatedReview);
    } else {
      next(createHttpError(404, `Review with id ${reviewId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
    if (deletedReview) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Review with id ${reviewId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
export default reviewsRouter;
