"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const routers_1 = __importDefault(require("../routers"));
const db_1 = __importDefault(require("../config/db"));
class App {
    constructor(port, dburl, routers, options = { useMongoDB: true, useSocketIO: false }) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.dburl = dburl;
        this.server = new http_1.default.Server(this.app);
        this.routers = routers;
        this.options = options;
        this.initializeMiddlewares();
        this.initializeRouters();
        this.initializeDB();
        if (this.options.useSocketIO) {
            this.io = new socket_io_1.Server(this.server);
            this.initializeSocket();
        }
    }
    //Mongo DB
    initializeDB() {
        db_1.default.connect(this.dburl);
    }
    //Middlewares
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.disable("x-powered-by");
        this.app.use(body_parser_1.default.json({ limit: "60mb" }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "60mb" }));
    }
    //Routers
    initializeRouters() {
        const routes = new routers_1.default(this.app);
        routes.initialize(this.routers);
    }
    //Websocket
    initializeSocket() {
        var _a;
        (_a = this.io) === null || _a === void 0 ? void 0 : _a.on("connection", (socket) => {
            console.log("Connected to Socket");
            //Handle socket events here
        });
    }
    //Listen app
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
