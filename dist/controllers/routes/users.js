"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.users = express_1.Router();
// users.get("/:uid", (req: Request, res: Response) => {
// 	const uid: string = req.params.uid;
// 	res.send("Hello User " + uid);
// });
exports.users.get("/:uid/dashboard", function (req, res) {
    var uid = req.params.uid;
    res.send("Hello User " + uid + " Dashoard");
});
exports.users.post("/register", function (req, res) {
    res.send("Hello Register");
});
exports.users.post("/login", function (req, res) {
    res.send("Hello Login");
});
