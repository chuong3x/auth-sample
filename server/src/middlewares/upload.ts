import Multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const multer = Multer({
    storage: Multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./dist/files");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        },
    }), // change this into memoryStorage from diskStorage
    // storage: Multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024,
    },
});

const deleteLocalFile = (filePath: string) => {
    fs.unlink(filePath, () => {
        console.log("file deleted");
    });
};

export { multer, deleteLocalFile };
