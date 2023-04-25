import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const generateTokens = (user: any) => {
    //create Tokens
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    //Return token
    return { accessToken, refreshToken };
};

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid!" });
    }
};

const verifyRefreshToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const refreshToken = req.cookies.rt;
    if (!refreshToken) {
        res.clearCookie("rt");
        return res.status(401).json({ message: "You are not authenticated" });
    }
    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        req.user = decoded;
        return next();
    } catch (error) {
        res.clearCookie("rt");
        return res.status(403).json({ message: "Token is not valid!" });
    }
};

export { generateTokens, verifyAccessToken, verifyRefreshToken };
