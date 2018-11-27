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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Product_1 = __importDefault(require("../../models/Product"));
var checkCookie_1 = __importDefault(require("../middleware/checkCookie"));
var shortid_1 = require("shortid");
var fs_1 = require("fs");
var path_1 = require("path");
var config_1 = __importDefault(require("../../config/config"));
var productsRouter = express_1.Router();
var multer_1 = __importDefault(require("multer"));
var upload = multer_1.default();
productsRouter.get("/query", checkCookie_1.default, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var query, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = new RegExp(req.query.s, "gi");
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, Product_1.default.find({
                        $and: [{ category: req.query.c }, { $or: [{ name: query }, { brand: query }] }]
                    }).exec()];
            case 1:
                products = _a.sent();
                res.status(200).send({ products: products });
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ error: "Unauthorized." });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
productsRouter.post("/cart/:pid", function (req, res) { });
productsRouter.post("/:pid", upload.single("image"), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var folderPath, filePath, imgBuffer, imgString, category, newProduct, product;
    return __generator(this, function (_a) {
        folderPath = path_1.join(config_1.default.db.uploads, req.params.pid);
        filePath = folderPath + "/thumbnail.png";
        if (req.file) {
            imgBuffer = req.file.buffer;
        }
        else {
            imgBuffer = fs_1.readFileSync(config_1.default.db.defaultProduct);
        }
        imgString = imgBuffer.toString("base64");
        if (!fs_1.existsSync(filePath))
            fs_1.mkdirSync(folderPath, { recursive: true });
        fs_1.writeFile(filePath, imgBuffer, function () { });
        category = config_1.default.categories.indexOf(req.body.category) != -1 ? req.body.category : "none";
        newProduct = {
            name: req.body.name,
            brand: req.body.brand,
            price: parseInt(req.body.price),
            quantity: parseInt(req.body.quantity),
            category: category,
            img: imgString
        };
        product = Product_1.default.findOneAndUpdate({ pid: req.body.pid }, newProduct).exec();
        if (product) {
            res.redirect("/admin/dashboard");
        }
        else {
            res.redirect("/admin/dashboard");
        }
        return [2 /*return*/];
    });
}); });
productsRouter.post("/", upload.single("image"), function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var pid, folderPath, filePath, imgBuffer, imgString, category, product, newProduct, err_1, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pid = shortid_1.generate();
                folderPath = path_1.join(config_1.default.db.uploads, pid);
                filePath = folderPath + "/thumbnail.png";
                if (req.file) {
                    imgBuffer = req.file.buffer;
                }
                else {
                    imgBuffer = fs_1.readFileSync(config_1.default.db.defaultProduct);
                }
                imgString = imgBuffer.toString("base64");
                if (!fs_1.existsSync(filePath))
                    fs_1.mkdirSync(filePath, { recursive: true });
                fs_1.writeFile(filePath, imgBuffer, function () { });
                category = config_1.default.categories.indexOf(req.body.category) != -1 ? req.body.category : "none";
                product = {
                    pid: pid,
                    name: req.body.name,
                    brand: req.body.brand,
                    price: parseInt(req.body.price),
                    quantity: parseInt(req.body.quantity),
                    category: category,
                    img: imgString
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Product_1.default(product).save()];
            case 2:
                newProduct = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                errors = Object.keys(err_1.errors).map(function (error) { return (error = err_1.errors[error]["message"]); });
                req.errors = errors;
                return [3 /*break*/, 4];
            case 4:
                next();
                return [2 /*return*/];
        }
    });
}); }, function (req, res) {
    res.redirect("/admin/dashboard");
});
exports.default = productsRouter;
