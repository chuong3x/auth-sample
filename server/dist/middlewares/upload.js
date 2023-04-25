"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFile = exports.multer = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const multer = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./dist/files");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        },
    }),
    // storage: Multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024,
    },
});
exports.multer = multer;
const deleteLocalFile = (filePath) => {
    fs_1.default.unlink(filePath, () => {
        console.log("file deleted");
    });
};
exports.deleteLocalFile = deleteLocalFile;
