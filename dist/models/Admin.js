"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config/config"));
var adminDefinition = {
    username: { type: String, default: "admin" },
    password: { type: String, required: true },
    email: { type: String }
};
exports.adminSchema = new mongoose_1.default.Schema(adminDefinition, config_1.default.collections.admin);
var AdminModel = mongoose_1.default.model("Admin", exports.adminSchema);
exports.default = AdminModel;
