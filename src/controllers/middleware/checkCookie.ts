import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { userDefinition } from "../../models/User";
import { adminDefinition } from "../../models/Admin";
export default (req: Request, res: Response, next: NextFunction) => {
	const userToken = req.cookies.user;
	if (userToken) {
		try {
			const check = jwt.verify(userToken, config.hash.salt);
			if (check) {
				const user: any = jwt.decode(userToken);
				if (user.username == "admin") {
					req.admin = <adminDefinition>user;
				} else {
					req.user = <userDefinition>user;
				}
			} else {
				res.clearCookie("user");
				req.user = undefined;
			}
		} catch (err) {
			req.user = undefined;
		}
	} else {
		req.user = undefined;
	}
	next();
};
