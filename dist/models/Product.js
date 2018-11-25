"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config/config"));
var shortid_1 = require("shortid");
var productDefinition = {
    pid: { type: String, default: shortid_1.generate },
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: String, default: 0 }
};
exports.productSchema = new mongoose_1.default.Schema(productDefinition, config_1.default.collections.products);
var ProductModel = mongoose_1.default.model("Product", exports.productSchema);
exports.default = ProductModel;
