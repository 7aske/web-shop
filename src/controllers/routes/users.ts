import { Router, Request, Response } from "express";
import UserModel, { userDefinition, comparePasswords, createUser } from "../../models/User";
import config from "../../config/config";
const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
	const users = await UserModel.find({}).exec();
	res.status(200).send(users);
});

usersRouter.get("/:uid", (req: Request, res: Response) => {
	const uid: string = req.params.uid;
	res.send("Hello User " + uid);
});

usersRouter.get("/:uid/dashboard", (req: Request, res: Response) => {
	const uid: string = req.params.uid;

	res.send("Hello User " + uid + " Dashoard");
});

usersRouter.post("/register", async (req: Request, res: Response) => {
	const user: userDefinition = {
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	};
	const check = await UserModel.find({ $or: [{ username: user.username }, { email: user.email }] }).exec();

	if (check.length == 0) {
		const newUser = await createUser(new UserModel(user));
		if (newUser) res.status(201).send(newUser);
		else res.status(500).send({ error: "Something went wrong" });
	} else {
		res.status(401).send({ error: "Username/e-mail taken." });
	}
});

usersRouter.post("/login", async (req: Request, res: Response) => {
	const user = await UserModel.findOne({
		$or: [{ username: req.body.username }, { email: req.body.username }]
	}).exec();
	if (user) {
		if (comparePasswords(user, req.body.password)) {
			//TODO: user logged in
			res.status(200).send({ OK: 200 });
		} else {
			res.status(401).send({ error: "Wrong password." });
		}
	} else {
		res.status(401).send({ error: "User not found." });
	}
});

export default usersRouter;
