import { Router, Request, Response } from "express";

const rootRouter = Router();

rootRouter.get("/", (req: Request, res: Response) => {
	res.render("index.handlebars", {
		title: "Home",
		payload: {
			user: req.user
		}
	});
});

export default rootRouter;
