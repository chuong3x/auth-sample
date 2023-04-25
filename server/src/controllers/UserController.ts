import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { generateTokens } from "../utils/auth";
dotenv.config();
//DEFINE

//HANDLE LOGIN, LOGOUT
export const login = async (req: Request, res: Response) => {
    const ip =
        req.headers["cf-connecting-ip"] ||
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        "";
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            email: (email as string).toLowerCase(),
        });
        if (!user) {
            return res.status(403).json({
                message: `User not found!`,
            });
        }
        if (!user.validatePassword(password as string)) {
            return res.status(403).json({
                message: `Password incorrect!`,
            });
        }
        if (user.isBanded) {
            return res.status(403).json({
                message: `User is banded!`,
            });
        }
        const { _id, fullName, membership, tokens, ...rest } = user.toObject();
        console.log(_id, fullName);

        const newtokens = generateTokens({
            _id,
            fullName,
            membership,
        });
        //Store token and ip for check later
        await UserModel.updateOne(
            { email: email.toLowerCase() },
            {
                tokens: [
                    ...user.tokens,
                    {
                        access: newtokens.accessToken,
                        refresh: newtokens.refreshToken,
                        ip: ip as string,
                    },
                ],
            }
        );
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
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id });
        if (!user) {
            throw new Error("User is not available!");
        }
        const tokens = user.tokens.filter((tk) => !tk.refresh);
        await UserModel.updateOne({ _id: user._id }, { tokens });
        res.clearCookie("rt");
        return res.status(200).json({ message: "Logout success" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    try {
        const find = await UserModel.findOne({ email: email.toLowerCase() });
        if (find) {
            return res.status(406).json({ message: "Email is existing!" });
        }
        const date = new Date();
        const expires = date.setDate(date.getDate() + 30);
        const user = new UserModel({
            email,
            fullName: name,
            expires,
            tokens: [],
        });
        user.setPassword(password);
        await user.save();
        return res.status(201).json({ message: "Register successful!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something is broken!" });
    }
};
// //HANDLE REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const ip =
            req.headers["cf-connecting-ip"] ||
            req.headers["x-real-ip"] ||
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "";
        const user = req.user;
        const rt = req.cookies.rt;
        const find = await UserModel.findOne({
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
        if (ip !== findExitingToken?.ip) {
            return res.status(403).json({ message: "Opps, Something wrong!" });
        }
        const newTokens = generateTokens({
            _id: user._id,
            fullName: user.fullName,
            membership: user.membership,
        });
        const filterTokens = tokens.filter((token) => token.refresh !== rt);
        filterTokens.push({
            access: newTokens.accessToken,
            refresh: newTokens.refreshToken,
            ip: ip as string,
        });
        await UserModel.updateOne(
            { _id: user._id },
            {
                tokens: filterTokens,
            }
        );
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
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error });
    }
};

export const check = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "I'm fine!", data: "" });
};
