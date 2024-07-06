import mongoose, { model, Mongoose, Schema } from "mongoose";

export const productSchema = new Schema({
  name: String,
  price: Number,
  detail: String,
  imageUrl: String,
});

export const productModel = model("product", productSchema);
