"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../../models/User"));
var settings_1 = require("../../settings/settings");
var shortid_1 = require("shortid");
var bcrypt_1 = __importDefault(require("bcrypt"));
var usersRouter = express_1.Router();
usersRouter.get("/", function (req, res) {
    User_1.default.find({})
        .exec()
        .then(function () { return console.log("Then"); })
        .catch(function () { return console.log("Catch"); });
    res.send("Hello Users");
});
usersRouter.get("/:uid", function (req, res) {
    var uid = req.params.uid;
    res.send("Hello User " + uid);
});
usersRouter.get("/:uid/dashboard", function (req, res) {
    var uid = req.params.uid;
    res.send("Hello User " + uid + " Dashoard");
});
usersRouter.post("/register", function (req, res) {
    var user = {
        uid: shortid_1.generate(),
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, settings_1.settings.hash.rounds)
    };
    var newUser = new User_1.default(user);
    newUser
        .save()
        .then(function (u) { return console.log(u); })
        .catch(function (e) { return console.log(e); });
    console.log(user);
});
usersRouter.post("/login", function (req, res) {
    res.send("Hello Login");
});
exports.default = usersRouter;
