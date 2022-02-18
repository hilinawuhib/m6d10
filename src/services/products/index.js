import express from "express";
import ProductModel from "./schema.js";
import ReviewModel from "../reviews/schema.js";

import createHttpError from "http-errors";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `product with id ${productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(
        createHttpError(
          404,
          `ProductupdatedProduct with id ${ProductupdatedProductId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Product with id ${productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.post("/:productId/review", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      res.status(404).send({
        message: `product with ${req.params.productId} is not found!`,
      });
    } else {
      const newProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { $push: { review: req.body } },
        { new: true }
      );
      res.send(newProduct);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const { total, product } = await BlogsModel.findProductsWithReviews(
      mongoQuery
    );
    res.send({
      links: mongoQuery.links("/product", total),
      total,
      totalPages: Math.ceil(total / mongoQuery.options.limit),
      books,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId/review", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (product) {
      res.send(product.review);
    } else {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId).populate({
      path: "reviews",
      select: "comment rate",
    });
    if (product) {
      res.send(product);
    } else {
      next(
        createHttpError(
          404,
          `productwith id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
