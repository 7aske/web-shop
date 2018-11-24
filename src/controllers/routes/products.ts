import { Router, Request, Response } from "express";

export const products = Router();

products.get("/", (req: Request, res: Response) => {
	res.send("Hello Products");
});
products.get("/:pid", (req: Request, res: Response) => {
	const pid: string = req.params.pid;
	res.send("Hello Products " + pid);
});
