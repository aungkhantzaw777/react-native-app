import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { user } from "./models/user";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import productRouter from "./route/product";
// import bodyParser from 'body-parser';

mongoose
  .connect(
    "mongodb+srv://aungkhantzaw133:1ae98vJuVcvebC4L@cluster0.pwmcsen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((r) => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("db not connect", e);
  });

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));

// Secret key for JWT
const secretKey = "123";

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    res.status(201).send({
      status: "complete",
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "something went wrong",
    });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const logginUser = await user.findOne({
    email: email,
  });
  console.log(logginUser);

  if (!logginUser) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Check password
  const isPasswordValid = bcrypt.compare(password, logginUser?.password || "");

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ name: logginUser.name }, secretKey, {
    expiresIn: "24h",
  });
  res.send({
    status: true,
    token: token,
  });
});

app.use("/api", productRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
