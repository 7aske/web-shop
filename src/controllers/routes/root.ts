import { Router, Request, Response } from "express";

export const root = Router();

root.get("/", (req: Request, res: Response) => {
	res.send("Hello ROOT");
});
