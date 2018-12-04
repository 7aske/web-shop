import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
export default async (req: Request, res: Response, next: NextFunction) => {
	if (req.admin) {
		const users: any = await User.find({}).exec();
		req.users = users;
	} else {
		req.users = [];
	}
	next();
};
