"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var shortid_1 = require("shortid");
var Product_1 = require("./Product");
var config_1 = __importDefault(require("../config/config"));
var orderDefinition = {
    oid: { type: String, default: shortid_1.generate },
    products: { type: [Product_1.productSchema], default: [] }
};
exports.orderSchema = new mongoose_1.default.Schema(orderDefinition, config_1.default.collections.products);
var OrderModel = mongoose_1.default.model("Order", exports.orderSchema);
exports.default = OrderModel;
