import { Request, Router, Response } from "express";
import { productModel } from "../models/product";
import { authenticateJWT } from "../middleware/authguard";
import jwt from "jsonwebtoken";
import { env } from "../env";

const userRouter = Router();
const secretKey = env.data?.JWT_SECRET || "123";

userRouter.get("/me", authenticateJWT, (req: Request, res: Response) => {
  // const products = productModel.find().limit(10);
  const authHeader = req.headers.authorization;

  const token = authHeader?.replace("Bearer ", "");
  const decoded = jwt.verify(token || "", secretKey) as unknown as {
    name: string;
    email: string;
  };

  res.send({
    user: decoded,
  });
});

export default userRouter;
