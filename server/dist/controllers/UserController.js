"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.refreshToken = exports.register = exports.logout = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = require("../models/UserModel");
const auth_1 = require("../utils/auth");
dotenv_1.default.config();
//DEFINE
//HANDLE LOGIN, LOGOUT
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.headers["cf-connecting-ip"] ||
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        "";
    try {
        const { email, password } = req.body;
        const user = yield UserModel_1.UserModel.findOne({
            email: email.toLowerCase(),
        });
        if (!user) {
            return res.status(403).json({
                message: `User not found!`,
            });
        }
        if (!user.validatePassword(password)) {
            return res.status(403).json({
                message: `Password incorrect!`,
            });
        }
        if (user.isBanded) {
            return res.status(403).json({
                message: `User is banded!`,
            });
        }
        const _a = user.toObject(), { _id, fullName, membership, tokens } = _a, rest = __rest(_a, ["_id", "fullName", "membership", "tokens"]);
        console.log(_id, fullName);
        const newtokens = (0, auth_1.generateTokens)({
            _id,
            fullName,
            membership,
        });
        //Store token and ip for check later
        yield UserModel_1.UserModel.updateOne({ email: email.toLowerCase() }, {
            tokens: [
                ...user.tokens,
                {
                    access: newtokens.accessToken,
                    refresh: newtokens.refreshToken,
                    ip: ip,
                },
            ],
        });
        //Send response
        res.cookie("rt", newtokens.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
        });
        return res.status(200).json({
            message: `Login success!`,
            data: newtokens.accessToken,
        });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.UserModel.findOne({ _id: req.user._id });
        if (!user) {
            throw new Error("User is not available!");
        }
        const tokens = user.tokens.filter((tk) => !tk.refresh);
        yield UserModel_1.UserModel.updateOne({ _id: user._id }, { tokens });
        res.clearCookie("rt");
        return res.status(200).json({ message: "Logout success" });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.logout = logout;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const find = yield UserModel_1.UserModel.findOne({ email: email.toLowerCase() });
        if (find) {
            return res.status(406).json({ message: "Email is existing!" });
        }
        const date = new Date();
        const expires = date.setDate(date.getDate() + 30);
        const user = new UserModel_1.UserModel({
            email,
            fullName: name,
            expires,
            tokens: [],
        });
        user.setPassword(password);
        yield user.save();
        return res.status(201).json({ message: "Register successful!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something is broken!" });
    }
});
exports.register = register;
// //HANDLE REFRESH TOKEN
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ip = req.headers["cf-connecting-ip"] ||
            req.headers["x-real-ip"] ||
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "";
        const user = req.user;
        const rt = req.cookies.rt;
        const find = yield UserModel_1.UserModel.findOne({
            _id: user._id,
        });
        if (!find) {
            return res.status(500).json({
                message: "You are not authenticated",
            });
        }
        //Store token and ip for check later
        const { tokens } = find.toObject();
        const findExitingToken = tokens.find((tk) => tk.refresh === rt);
        if (ip !== (findExitingToken === null || findExitingToken === void 0 ? void 0 : findExitingToken.ip)) {
            return res.status(403).json({ message: "Opps, Something wrong!" });
        }
        const newTokens = (0, auth_1.generateTokens)({
            _id: user._id,
            fullName: user.fullName,
            membership: user.membership,
        });
        const filterTokens = tokens.filter((token) => token.refresh !== rt);
        filterTokens.push({
            access: newTokens.accessToken,
            refresh: newTokens.refreshToken,
            ip: ip,
        });
        yield UserModel_1.UserModel.updateOne({ _id: user._id }, {
            tokens: filterTokens,
        });
        //Response
        res.cookie("rt", newTokens.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).json({
            message: "Refresh tokens success",
            data: newTokens.accessToken,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error });
    }
});
exports.refreshToken = refreshToken;
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "I'm fine!", data: "" });
});
exports.check = check;
