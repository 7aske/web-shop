import { Router, Request, Response, NextFunction } from "express";
import Admin, { adminDefinition } from "../../models/Admin";
import { comparePasswords } from "../../models/User";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import getProducts from "../middleware/getProducts";
import Product, { productSchema } from "../../models/Product";

const adminRouter = Router();

adminRouter.get("/", (req: Request, res: Response) => {
	res.redirect("/admin/login");
});

adminRouter.get("/dashboard", getProducts, async (req: Request, res: Response) => {
	if (req.user) {
		res.render("adminDashboard.handlebars", {
			title: "Admin Dashboard",
			payload: {
				user: req.user,
				products: req.products,
				errors: req.errors
			}
		});
	} else {
		res.status(403).send({ message: "Unauthorized." });
	}
});

adminRouter.get("/login", (req: Request, res: Response) => {
	res.render("login.handlebars", { title: "Admin Login" });
});

adminRouter.post("/login", async (req: Request, res: Response) => {
	const admin: any = await Admin.findOne({ username: req.body.username }).exec();
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
				res.setHeader("Set-Cookie", `user=${token}; Path=/admin;`);
				res.redirect("/admin/dashboard");
			} else {
				res.status(403).send({ error: "Unauthorized." });
			}
		} catch (err) {
			res.status(403).send({ error: "Unauthorized." });
		}
	} else {
		res.redirect("/admin/login");
	}
});

adminRouter.get("/logout", (req: Request, res: Response) => {
	res.clearCookie("user");
	res.redirect("/admin/login");
});

export default adminRouter;
