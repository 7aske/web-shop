import { Router, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import UserModel, { userDefinition, comparePasswords, createUser } from "../../models/User";
import config from "../../config/config";
const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
	const users = await UserModel.find({}).exec();
	res.status(200).send(users);
});

usersRouter.get("/dashboard", (req: Request, res: Response) => {
	const user = req.user;
	if (user) {
		res.render("dashboard.handlebars", { title: "Dashboard", payload: { user: user } });
	} else {
		res.status(403).send({ error: "Unauthorized." });
	}
});

// usersRouter.get("/:uid", (req: Request, res: Response) => {
// 	const uid: string = req.params.uid;.
// 	res.send("Hello User " + uid);
// });

usersRouter.get("/register", (req: Request, res: Response) => {
	res.render("register.handlebars");
});

usersRouter.post("/register", async (req: Request, res: Response) => {
	const user: userDefinition = {
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	};
	let inputError = false;
	for (let key in user) {
		if (user[key] == "" || user[key] == undefined) {
			inputError = true;
		}
	}
	if (!inputError) {
		const check = await UserModel.find({ $or: [{ username: user.username }, { email: user.email }] }).exec();
		if (check.length == 0) {
			const newUser: any = await createUser(new UserModel(user));
			if (newUser) {
				res.render("login.handlebars");
			} else {
				res.status(500).send({ error: "Something went wrong" });
			}
		} else {
			res.status(401).send({ error: "Username/e-mail taken." });
		}
	} else {
		res.render("register.handlebars");
	}
});

usersRouter.get("/login", (req: Request, res: Response) => {
	res.render("login.handlebars");
});

usersRouter.post("/login", async (req: Request, res: Response) => {
	const user: any = await UserModel.findOne({
		$or: [{ username: req.body.username }, { email: req.body.username }]
	}).exec();

	if (user) {
		const foundUser: userDefinition = {
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		};
		try {
			const check = comparePasswords(user.password, req.body.password);
			if (check) {
				const token = jwt.sign(foundUser, config.hash.salt, {
					expiresIn: "1d"
				});
				res.setHeader("Set-Cookie", `user=${token}; Path=/;`);
				res.redirect("/users/dashboard");
			} else {
				res.status(403).send({ error: "Unauthorized." });
			}
		} catch (err) {
			res.status(403).send({ error: "Unauthorized." });
		}
	} else {
		res.status(401).send({ error: "User not found." });
	}
});

usersRouter.get("/logout", (req: Request, res: Response) => {
	res.clearCookie("user");
	res.redirect("/users/login");
});

export default usersRouter;
