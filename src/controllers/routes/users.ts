import { Router, Request, Response } from "express";
import UserModel, { userDefinition } from "../../models/User";
import { settings } from "../../settings/settings";
import { generate } from "shortid";
import bcrypt from "bcrypt";
const usersRouter = Router();

usersRouter.get("/", (req: Request, res: Response) => {
	UserModel.find({})
		.exec()
		.then(() => console.log("Then"))
		.catch(() => console.log("Catch"));
	res.send("Hello Users");
});

usersRouter.get("/:uid", (req: Request, res: Response) => {
	const uid: string = req.params.uid;
	res.send("Hello User " + uid);
});

usersRouter.get("/:uid/dashboard", (req: Request, res: Response) => {
	const uid: string = req.params.uid;

	res.send("Hello User " + uid + " Dashoard");
});

usersRouter.post("/register", (req: Request, res: Response) => {
	const user: userDefinition = {
		uid: generate(),
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, settings.hash.rounds)
	};

	let newUser = new UserModel(user);

	newUser
		.save()
		.then(u => console.log(u))
		.catch(e => console.log(e));
	console.log(user);
});

usersRouter.post("/login", (req: Request, res: Response) => {
	res.send("Hello Login");
});

export default usersRouter;
