import mongoose from "mongoose";
import crypto from "crypto";

import { ITokens } from "../types";

interface IUser {
    email: string;
    fullName: string;
    membership: string;
    expires: Date;
    tokens: ITokens[];
    isBanded: boolean;
    hash: string;
    salt: string;
    setPassword: (password: string) => void;
    validatePassword: (password: string) => boolean;
}
const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true },
        fullName: { type: String, required: true },
        membership: { type: String, required: true, default: "standard" },
        expires: { type: Date, required: true },
        tokens: [{ access: String, refresh: String, ip: String }],
        isBanded: { type: Boolean, required: true, default: false },
        hash: String,
        salt: String,
    },
    { timestamps: true }
);
userSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
};
userSchema.method("validatePassword", function (password: string) {
    let hash: string = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.hash === hash;
});
export const UserModel = mongoose.model<IUser>("User", userSchema);
