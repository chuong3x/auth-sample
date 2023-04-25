"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const fileSchema = new mongoose_1.default.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    size: { type: String, required: true },
    url: { type: String, required: true },
}, { timestamps: true });
exports.FileModel = mongoose_1.default.model("File", fileSchema);
