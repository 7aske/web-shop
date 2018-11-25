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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importStar(require("../../models/User"));
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
usersRouter.get("/:uid", function (req, res) {
    var uid = req.params.uid;
    res.send("Hello User " + uid);
});
usersRouter.get("/:uid/dashboard", function (req, res) {
    var uid = req.params.uid;
    res.send("Hello User " + uid + " Dashoard");
});
usersRouter.post("/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, check, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                };
                return [4 /*yield*/, User_1.default.find({ $or: [{ username: user.username }, { email: user.email }] }).exec()];
            case 1:
                check = _a.sent();
                if (!(check.length == 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.createUser(new User_1.default(user))];
            case 2:
                newUser = _a.sent();
                if (newUser)
                    res.status(201).send(newUser);
                else
                    res.status(500).send({ error: "Something went wrong" });
                return [3 /*break*/, 4];
            case 3:
                res.status(401).send({ error: "Username/e-mail taken." });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
usersRouter.post("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.findOne({
                    $or: [{ username: req.body.username }, { email: req.body.username }]
                }).exec()];
            case 1:
                user = _a.sent();
                if (user) {
                    if (User_1.comparePasswords(user, req.body.password)) {
                        //TODO: user logged in
                        res.status(200).send({ OK: 200 });
                    }
                    else {
                        res.status(401).send({ error: "Wrong password." });
                    }
                }
                else {
                    res.status(401).send({ error: "User not found." });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = usersRouter;
