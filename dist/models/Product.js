"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var settings_1 = require("../settings/settings");
var shortid_1 = require("shortid");
var productDefinition = {
    pid: { type: String, default: shortid_1.generate },
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: String, default: 0 }
};
var productSchema = new mongoose_1.Schema(productDefinition, settings_1.settings.collections.products);
exports.User = new mongoose_1.Model(productSchema);