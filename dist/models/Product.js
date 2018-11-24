"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var settings_1 = require("../settings/settings");
var shortid_1 = require("shortid");
var userTemplate = {
    pid: { type: String, default: shortid_1.generate },
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: String, default: 0 }
};
exports.User = new mongoose_1.Schema(userTemplate, settings_1.settings.collections.products);
