import { Request, Router, Response } from "express";

const productRouter = Router();

productRouter.get("/product", (req: Request, res: Response) => {
  res.send({
    products: [],
  });
});

export default productRouter;
