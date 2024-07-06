import { Request, Router, Response } from "express";
import { faker } from "@faker-js/faker";
import { productModel } from "../models/product";
import { authenticateJWT } from "../middleware/authguard";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { user } from "../models/user";

const orderRouter = Router();

const secretKey = env.data?.JWT_SECRET || "123";

orderRouter.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { id } = req.body;

  const token = authHeader?.replace("Bearer ", "");

  const decoded = jwt.verify(token || "", secretKey) as unknown as {
    name: string;
    email: string;
    id: string;
  };

  const pickProduct = await productModel.findById(id);
  if (!pickProduct) {
    return res.send({
      status: false,
      message: "product not found",
    });
  }

  const currentUser = await user.findById(decoded.id);
  currentUser?.myOrder.push(pickProduct._id);
  currentUser?.save();

  res.send({
    status: true,
    message: "your order is place",
  });
});

orderRouter.get("/", authenticateJWT, async (req: Request, Res: Response) => {
  const authHeader = req.headers.authorization;
  //   const { id } = req.body;
  const token = authHeader?.replace("Bearer ", "");
  const decoded = jwt.verify(token || "", secretKey) as unknown as {
    name: string;
    email: string;
    id: string;
  };
  console.log(decoded);

  const currentUser = await user.findById(decoded.id).populate("myOrder");
  console.log("current user", currentUser);

  Res.send(currentUser);
});

export default orderRouter;
