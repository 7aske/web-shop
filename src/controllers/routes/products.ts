import { Router, Request, Response } from "express";

const productsRouter = Router();

productsRouter.get("/", (req: Request, res: Response) => {
	res.send("Hello Products");
});
productsRouter.get("/:pid", (req: Request, res: Response) => {
	const pid: string = req.params.pid;
	res.send("Hello Products " + pid);
});

export default productsRouter;
