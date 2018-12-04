import { Router, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User, { userDefinition, comparePasswords, createUser, validate, registrationErrors } from "../../models/User";
import config from "../../config/config";
import checkCookie from "../middleware/checkCookie";
const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
	const users = await User.find({}).exec();
	res.status(200).send(users);
});

usersRouter.get("/dashboard", (req: Request, res: Response) => {
	if (req.user) {
		res.render("dashboard.handlebars", { title: "Dashboard", payload: { user: req.user } });
	} else {
		res.render("login.handlebars", { title: "Login", payload: { errors: ["Unauthorized. Please log in."] } });
	}
});

// usersRouter.get("/:uid", (req: Request, res: Response) => {
// 	const uid: string = req.params.uid;.
// 	res.send("Hello User " + uid);
// });

usersRouter.get("/register", (req: Request, res: Response) => {
	res.render("register.handlebars", { title: "Register" });
});

usersRouter.post("/register", async (req: Request, res: Response) => {
	const user: userDefinition = {
		username: req.body.username.toLowerCase(),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email.toLowerCase(),
		password: req.body.password,
		confirm: req.body.confirm
	};
	let regErrors: registrationErrors = await validate(user);
	if (!regErrors) {
		const newUser: any = await createUser(new User(user));
		if (newUser) {
			res.render("login.handlebars", { title: "Login", payload: { messages: ["Successfuly registered."] } });
		} else {
			res.render("register.handlebars", { title: "Register", payload: { errors: ["Something went wrong."] } });
		}
	} else {
		res.render("register.handlebars", { title: "Register", payload: { regErrors: regErrors, validFields: user } });
	}
});

usersRouter.get("/login", (req: Request, res: Response) => {
	if (req.user) {
		res.redirect("/users/dashboard");
	} else {
		res.render("login.handlebars", { title: "Login" });
	}
});

usersRouter.post("/login", async (req: Request, res: Response) => {
	const cred: string = req.body.username.toLowerCase();
	const pass: string = req.body.password;
	const user: any = await User.findOne({
		$or: [{ username: cred }, { email: cred }]
	}).exec();
	if (user) {
		const foundUser: userDefinition = {
			pid: user.pid,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		};
		try {
			if (comparePasswords(user.password, pass)) {
				const token = jwt.sign(foundUser, config.hash.salt, {
					expiresIn: "1d"
				});
				res.setHeader("Set-Cookie", `user=${token}; Path=/;`);
				res.redirect("/users/dashboard");
			} else {
				res.render("login.handlebars", { title: "Login", payload: { errors: ["Invalid password."] } });
			}
		} catch (err) {
			res.render("login.handlebars", { title: "Login", payload: { errors: ["Something went wrong."] } });
		}
	} else {
		res.render("login.handlebars", { title: "Login", payload: { errors: ["User not found."] } });
	}
});

usersRouter.get("/logout", (req: Request, res: Response) => {
	req.admin = undefined;
	req.user = undefined;
	res.clearCookie("user");
	res.redirect("/users/login");
});
usersRouter.post("/:uid", checkCookie, async (req: Request, res: Response) => {
	const user: userDefinition = {
		uid: req.body.uid,
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	};
	try {
		const check = await User.findOneAndUpdate({ uid: req.body.uid }, user).exec();
	} catch (err) {}
	res.redirect("/admin/dashboard");
});

export default usersRouter;
