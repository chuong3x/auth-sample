import { Request, Response } from "express";
import { FileModel } from "../models/FileModel";

export const upload = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res
                .status(500)
                .json({ message: "Server can not find the file" });
        }
        const user = req.user;
        if (!user) {
            return res
                .status(403)
                .json({ message: "You don't have permission" });
        }
        const file = new FileModel({
            name: req.file.originalname,
            size: req.file.size,
            url: req.file.path,
            user: user._id,
        });
        const savedFile = await file.save();
        if (!savedFile) {
            return res.status(500).json({
                message: "Error when save file",
            });
        }
        return res.status(200).json({ message: "Upload success!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const get = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(403)
                .json({ message: "You don't have permission" });
        }
        const file = await FileModel.find({ user: user._id });
        return res
            .status(200)
            .json({ message: "Get files success!", data: file });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
