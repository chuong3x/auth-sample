"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    membership: { type: String, required: true, default: "standard" },
    expires: { type: Date, required: true },
    tokens: [{ access: String, refresh: String, ip: String }],
    isBanded: { type: Boolean, required: true, default: false },
    hash: String,
    salt: String,
}, { timestamps: true });
userSchema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString("hex");
    this.hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
};
userSchema.method("validatePassword", function (password) {
    let hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.hash === hash;
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
