import { Router, Request, Response, NextFunction } from "express";
import Admin, { adminDefinition } from "../../models/Admin";
import { comparePasswords } from "../../models/User";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import getProducts from "../middleware/getProducts";
import Product, { productSchema } from "../../models/Product";
import getUsers from "../middleware/getUsers";

const adminRouter = Router();

adminRouter.get("/", (req: Request, res: Response) => {
	res.redirect("/admin/login");
});

adminRouter.get("/dashboard", getProducts, getUsers, async (req: Request, res: Response) => {
	if (req.admin) {
		res.render("adminDashboard.handlebars", {
			title: "Admin Dashboard",
			admin: true,
			payload: {
				user: req.admin,
				users: req.users,
				products: req.products,
				errors: req.errors,
				categories: config.categories
			}
		});
	} else {
		res.render("login.handlebars", {
			title: "Admin Login",
			admin: true,
			payload: { errors: ["Unauthorized. Please log in."] }
		});
	}
});

adminRouter.get("/login", (req: Request, res: Response) => {
	if (req.admin) {
		res.redirect("/admin/dashboard");
	} else {
		res.render("login.handlebars", {
			title: "Admin Login",
			admin: true
		});
	}
});

adminRouter.post("/login", async (req: Request, res: Response) => {
	const admin: any = await Admin.findOne({ username: req.body.username }).exec();
	let loginErrors: string[] = [];
	if (admin) {
		const foundAdmin: adminDefinition = {
			username: admin.username,
			password: admin.password,
			email: admin.email
		};
		try {
			const check = await comparePasswords(foundAdmin.password, req.body.password);
			if (check) {
				const token = jwt.sign(foundAdmin, config.hash.salt, {
					expiresIn: "2h"
				});
				res.setHeader("Set-Cookie", `user=${token}; Path=/;`);
				res.redirect("/admin/dashboard");
			} else {
				loginErrors.push("Invalid password.");
				res.render("login.handlebars", { title: "Admin Login", admin: true, payload: { errors: loginErrors } });
			}
		} catch (err) {
			loginErrors.push("Something went wrong.");
			res.render("login.handlebars", { title: "Admin Login", admin: true, payload: { errors: loginErrors } });
		}
	} else {
		loginErrors.push("Invalid admin username.");
		res.render("login.handlebars", { title: "Admin Login", admin: true, payload: { errors: loginErrors } });
	}
});

adminRouter.get("/logout", (req: Request, res: Response) => {
	req.admin = undefined;
	req.user = undefined;
	res.clearCookie("user");
	res.redirect("/admin/login");
});

export default adminRouter;
