import mongoose from "mongoose";
const { Schema, model } = mongoose;
const productSchema = new Schema(
  {
    name: { type: String, required: true }, //REQUIRED
    description: { type: String, required: true }, //REQUIRED
    brand: { type: String, required: true }, //REQUIRED
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true }, //REQUIRED
    category: { type: String, required: true },

    review: [
      {
        comment: { type: String },
        rate: { type: String },
      },
    ],
  },

  {
    timestamps: true,
  }
);
productSchema.static("findProductsWithReviews", async function (mongoQuery) {
  const total = await this.countDocuments(mongoQuery.criteria);
  const products = await this.find(mongoQuery.criteria)
    .limit(mongoQuery.options.limit)
    .skip(mongoQuery.options.skip)
    .sort(mongoQuery.options.sort)
    .populate({
      path: "reviews",
      select: "comment rate",
    });
  return { total, products };
});
export default model("product", productSchema);
