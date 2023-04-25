"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const routes_1 = __importDefault(require("./routers/routes"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const DBURL = process.env.DBURL;
const server = new app_1.default(PORT, DBURL, routes_1.default, { useSocketIO: true });
server.listen();
