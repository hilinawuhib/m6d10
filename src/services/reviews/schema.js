import mongoose from "mongoose";
const { Schema, model } = mongoose;
const reviewSchema = new Schema(
  {
    comment: { type: String, required: true }, //REQUIRED

    rate: { type: Number, required: true }, //REQUIRED
  },
  {
    timestamps: true,
  }
);
export default model("review", reviewSchema);
