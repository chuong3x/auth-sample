import { Request, Response } from "express";

export const homeController = (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome!" });
};
