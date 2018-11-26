import { Router, Request, Response } from "express";
import config from "../../config/config";

const rootRouter = Router();

rootRouter.get("/browse", (req: Request, res: Response) => {
	res.render("browse.handlebars", {
		title: "Home",
		payload: {
			user: req.user,
			categories: config.categories
		}
	});
});
rootRouter.get("/", (req: Request, res: Response) => {
	res.render("index.handlebars", {
		title: "Home",
		payload: {
			user: req.user
		}
	});
});

export default rootRouter;
