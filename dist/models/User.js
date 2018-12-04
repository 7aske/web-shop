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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var crypto_1 = require("crypto");
var config_1 = __importDefault(require("../config/config"));
var shortid_1 = require("shortid");
var Order_1 = require("./Order");
var userTemplate = {
    uid: { type: String, default: shortid_1.generate },
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    orders: { type: [Order_1.orderSchema], default: [] }
};
exports.userSchema = new mongoose_1.default.Schema(userTemplate, { collection: config_1.default.collections.users });
var UserModel = mongoose_1.default.model("User", exports.userSchema);
exports.default = UserModel;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.uid = shortid_1.generate();
                    user.password = crypto_1.createHmac("sha256", config_1.default.hash.salt)
                        .update(user.password)
                        .digest("hex");
                    return [4 /*yield*/, user.save()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createUser = createUser;
function comparePasswords(hashed, notHashed) {
    return (hashed ==
        crypto_1.createHmac("sha256", config_1.default.hash.salt)
            .update(notHashed)
            .digest("hex"));
}
exports.comparePasswords = comparePasswords;
function validate(user) {
    return __awaiter(this, void 0, void 0, function () {
        var onlyAlphanumeric, onlyCharacters, email, regErrors, check;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onlyAlphanumeric = new RegExp(/^[^.-][a-zA-z0-9.-]+[^.-]$/);
                    onlyCharacters = new RegExp(/^[a-zA-Z]+$/);
                    email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                    regErrors = {
                        username: [],
                        password: [],
                        email: [],
                        firstName: [],
                        lastName: []
                    };
                    return [4 /*yield*/, UserModel.findOne({ username: user.username }).exec()];
                case 1:
                    if (_a.sent())
                        regErrors.username.push("Username taken.");
                    if (user.username.length < 5)
                        regErrors.username.push("Minimum 5 characters.");
                    if (!onlyAlphanumeric.test(user.username))
                        regErrors.username.push("Only alphanumeric characters.");
                    if (user.password.length < 4)
                        regErrors.password.push("Minimum 4 characters.");
                    if (user.password != user.confirm)
                        regErrors.password.push("Passwords don't match.");
                    return [4 /*yield*/, UserModel.findOne({ email: user.email }).exec()];
                case 2:
                    if (_a.sent())
                        regErrors.email.push("Email taken.");
                    if (user.email.length == 0)
                        regErrors.email.push("Email required.");
                    if (!email.test(user.email))
                        regErrors.email.push("Invalid email.");
                    if (user.firstName.length == 0)
                        regErrors.firstName.push("First name required.");
                    if (!onlyCharacters.test(user.firstName))
                        regErrors.firstName.push("Only characters.");
                    if (user.lastName.length == 0)
                        regErrors.lastName.push("Last name required.");
                    if (!onlyCharacters.test(user.lastName))
                        regErrors.lastName.push("Only characters.");
                    check = false;
                    Object.keys(regErrors).forEach(function (e) {
                        if (regErrors[e].length > 0)
                            check = true;
                    });
                    if (check)
                        return [2 /*return*/, regErrors];
                    else
                        return [2 /*return*/, null];
                    return [2 /*return*/];
            }
        });
    });
}
exports.validate = validate;
