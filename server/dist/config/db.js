"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connect(DBURL) {
    mongoose_1.default
        .connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("Connected to DB");
    })
        .catch((err) => {
        console.log("err", err);
    });
}
exports.default = { connect };
