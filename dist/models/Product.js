"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var settings_1 = require("../settings/settings");
var shortid_1 = require("shortid");
exports.productDefinition = {
    pid: { type: String, default: shortid_1.generate },
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: String, default: 0 }
};
var productSchema = new mongoose_1.default.Schema(exports.productDefinition, settings_1.settings.collections.products);
var ProductModel = mongoose_1.default.model("Product", productSchema);
exports.default = ProductModel;
