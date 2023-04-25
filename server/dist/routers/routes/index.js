"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const home_1 = __importDefault(require("./home"));
const file_1 = __importDefault(require("./file"));
const doc_1 = __importDefault(require("./doc"));
const routes = [
    {
        path: "/api/doc",
        router: new doc_1.default().getRouter(),
    },
    {
        path: "/api/file",
        router: new file_1.default().getRouter(),
    },
    {
        path: "/api/auth",
        router: new auth_1.default().getRouter(),
    },
    {
        path: "/api",
        router: new home_1.default().getRouter(),
    },
];
exports.default = routes;
