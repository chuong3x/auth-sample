"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeController = void 0;
const homeController = (req, res) => {
    res.status(200).json({ message: "Welcome!" });
};
exports.homeController = homeController;
