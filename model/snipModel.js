"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SnipSchema = new mongoose_1.default.Schema({
    snipSender: String,
    snipText: String,
});
const Snip = mongoose_1.default.model("Snip", SnipSchema);
exports.default = Snip;
