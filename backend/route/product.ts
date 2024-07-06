import { Request, Router, Response } from "express";
import { faker } from "@faker-js/faker";
import { productModel } from "../models/product";
import { authenticateJWT } from "../middleware/authguard";

const productRouter = Router();

productRouter.get(
  "/product",
  authenticateJWT,
  async (req: Request, res: Response) => {
    const { page = 1 } = req.query;
    if (typeof page !== "string") {
      return res.status(400).send({
        message: "page wrong",
      });
    }

    const limit = 10;
    const products = await productModel
      .find()
      .limit(10)
      .skip((parseInt(page) - 1) * limit)
      .exec();

    const count = await productModel.countDocuments();
    res.send({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

productRouter.post(
  "/product",
  authenticateJWT,
  async (req: Request, res: Response) => {
    const imageUrl = faker.image.urlLoremFlickr({
      category: "shopping",
    });

    const product = await productModel.create({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      detail: faker.commerce.productDescription(),
      imageUrl: faker.image.url({
        width: 300,
        height: 640,
      }),
    });
    res.send({
      product,
    });
  }
);

productRouter.get(
  "/product/:id",
  authenticateJWT,
  async (req: Request, res: Response) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(400).send({
          message: "record not found",
        });
      }
      res.send({
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

export default productRouter;
