"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = __importDefault(require("../../config/config"));
exports.default = (function (req, res, next) {
    var userToken = req.cookies.user;
    if (userToken) {
        try {
            var check = jwt.verify(userToken, config_1.default.hash.salt);
            if (check) {
                var user = jwt.decode(userToken);
                if (user.username == "admin") {
                    req.admin = user;
                }
                else {
                    req.user = user;
                }
            }
            else {
                res.clearCookie("user");
                req.user = undefined;
            }
        }
        catch (err) {
            res.clearCookie("user");
            req.user = undefined;
        }
    }
    else {
        res.clearCookie("user");
        req.user = undefined;
    }
    next();
});
