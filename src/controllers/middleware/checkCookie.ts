import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { userDefinition } from "../../models/User";
export default (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.user;
	if (token) {
		try {
			const check = jwt.verify(token, config.hash.salt);
			if (check) {
				const user = jwt.decode(token);
				console.log(user);

				req.user = <userDefinition>user;
			} else {
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
