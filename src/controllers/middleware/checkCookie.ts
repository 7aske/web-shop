import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { userDefinition } from "../../models/User";
export default (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.user;
	if (token) {
		if (jwt.verify(token, config.hash.salt)) {
			const user = jwt.decode(token);
			req.user = <userDefinition>user;
		} else {
			req.user = undefined;
		}
	} else {
		req.user = undefined;
	}
	next();
};
