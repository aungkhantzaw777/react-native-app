import mongoose, { model, Mongoose, Schema } from "mongoose";
import { productModel } from "./product";

// export const orderSchema = newSchema({})

export const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  myOrder: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

export const user = model("user", userSchema);
