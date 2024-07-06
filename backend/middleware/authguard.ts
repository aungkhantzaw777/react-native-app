import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

const secretKey = env.data?.JWT_SECRET || "123";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, secretKey) as { name: string };
    // req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
