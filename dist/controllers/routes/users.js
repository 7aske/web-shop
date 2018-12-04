"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = __importStar(require("jsonwebtoken"));
var User_1 = __importStar(require("../../models/User"));
var config_1 = __importDefault(require("../../config/config"));
var checkCookie_1 = __importDefault(require("../middleware/checkCookie"));
var usersRouter = express_1.Router();
usersRouter.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.find({}).exec()];
            case 1:
                users = _a.sent();
                res.status(200).send(users);
                return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/dashboard", function (req, res) {
    if (req.user) {
        res.render("dashboard.handlebars", { title: "Dashboard", payload: { user: req.user } });
    }
    else {
        res.render("login.handlebars", { title: "Login", payload: { errors: ["Unauthorized. Please log in."] } });
    }
});
// usersRouter.get("/:uid", (req: Request, res: Response) => {
// 	const uid: string = req.params.uid;.
// 	res.send("Hello User " + uid);
// });
usersRouter.get("/register", function (req, res) {
    res.render("register.handlebars", { title: "Register" });
});
usersRouter.post("/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, regErrors, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: req.body.username.toLowerCase(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                    confirm: req.body.confirm
                };
                return [4 /*yield*/, User_1.validate(user)];
            case 1:
                regErrors = _a.sent();
                if (!!regErrors) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.createUser(new User_1.default(user))];
            case 2:
                newUser = _a.sent();
                if (newUser) {
                    res.render("login.handlebars", { title: "Login", payload: { messages: ["Successfuly registered."] } });
                }
                else {
                    res.render("register.handlebars", { title: "Register", payload: { errors: ["Something went wrong."] } });
                }
                return [3 /*break*/, 4];
            case 3:
                res.render("register.handlebars", { title: "Register", payload: { regErrors: regErrors, validFields: user } });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/login", function (req, res) {
    if (req.user) {
        res.redirect("/users/dashboard");
    }
    else {
        res.render("login.handlebars", { title: "Login" });
    }
});
usersRouter.post("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cred, pass, user, foundUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cred = req.body.username.toLowerCase();
                pass = req.body.password;
                return [4 /*yield*/, User_1.default.findOne({
                        $or: [{ username: cred }, { email: cred }]
                    }).exec()];
            case 1:
                user = _a.sent();
                if (user) {
                    foundUser = {
                        pid: user.pid,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                    try {
                        if (User_1.comparePasswords(user.password, pass)) {
                            token = jwt.sign(foundUser, config_1.default.hash.salt, {
                                expiresIn: "1d"
                            });
                            res.setHeader("Set-Cookie", "user=" + token + "; Path=/;");
                            res.redirect("/users/dashboard");
                        }
                        else {
                            res.render("login.handlebars", { title: "Login", payload: { errors: ["Invalid password."] } });
                        }
                    }
                    catch (err) {
                        res.render("login.handlebars", { title: "Login", payload: { errors: ["Something went wrong."] } });
                    }
                }
                else {
                    res.render("login.handlebars", { title: "Login", payload: { errors: ["User not found."] } });
                }
                return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/logout", function (req, res) {
    req.admin = undefined;
    req.user = undefined;
    res.clearCookie("user");
    res.redirect("/users/login");
});
usersRouter.post("/:uid", checkCookie_1.default, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, check, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    uid: req.body.uid,
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.default.findOneAndUpdate({ uid: req.body.uid }, user).exec()];
            case 2:
                check = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [3 /*break*/, 4];
            case 4:
                res.redirect("/admin/dashboard");
                return [2 /*return*/];
        }
    });
}); });
exports.default = usersRouter;
