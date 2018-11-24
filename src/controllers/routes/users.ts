import { Router, Request, Response } from "express";

export const users = Router();

// users.get("/:uid", (req: Request, res: Response) => {
// 	const uid: string = req.params.uid;
// 	res.send("Hello User " + uid);
// });

users.get("/:uid/dashboard", (req: Request, res: Response) => {
	const uid: string = req.params.uid;
	res.send("Hello User " + uid + " Dashoard");
});

users.post("/register", (req: Request, res: Response) => {
	res.send("Hello Register");
});

users.post("/login", (req: Request, res: Response) => {
	res.send("Hello Login");
});
