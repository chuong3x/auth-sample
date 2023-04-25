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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.upload = void 0;
const FileModel_1 = require("../models/FileModel");
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const file = new FileModel_1.FileModel({
            name: req.file.originalname,
            size: req.file.size,
            url: req.file.path,
            user: user._id,
        });
        const savedFile = yield file.save();
        if (!savedFile) {
            return res.status(500).json({
                message: "Error when save file",
            });
        }
        return res.status(200).json({ message: "Upload success!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.upload = upload;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(403)
                .json({ message: "You don't have permission" });
        }
        const file = yield FileModel_1.FileModel.find({ user: user._id });
        return res
            .status(200)
            .json({ message: "Get files success!", data: file });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.get = get;
