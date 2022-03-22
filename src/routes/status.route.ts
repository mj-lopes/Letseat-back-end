import { Router, Request, Response } from "express";

const statusRouter = Router();

statusRouter.get("/status", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default statusRouter;
