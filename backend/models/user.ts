import mongoose, { model, Mongoose, Schema } from "mongoose";

export const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export const user = model("user", userSchema);
