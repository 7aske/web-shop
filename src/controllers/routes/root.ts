import { Router, Request, Response } from "express";

const rootRouter = Router();

rootRouter.get("/", (req: Request, res: Response) => {
	res.render("index.handlebars", { title: "Home", payload: req.cookies.token });
});

export default rootRouter;
