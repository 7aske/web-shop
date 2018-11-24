"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var settings_1 = require("../settings/settings");
var shortid_1 = require("shortid");
var userTemplate = {
    uid: { type: String, default: shortid_1.generate },
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
};
exports.User = new mongoose_1.Schema(userTemplate, settings_1.settings.collections.users);
