import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
const server = express();
const port = process.env.PORT || 3008;
server.use(cors());
server.use(express.json());
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
  server.listen(port, () => {
    console.log("server is running on port", port);
  });
});
