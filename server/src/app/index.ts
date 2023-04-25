import express, { Express } from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import AppRouter from "../routers";
import { AppOptions, RouterObject } from "../types";
import db from "../config/db";

class App {
    public app: Express;
    private port: number;
    private dburl: string;
    private server: http.Server;
    private routers: RouterObject[];
    private io?: Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >;
    private options?: AppOptions;

    constructor(
        port: number,
        dburl: string,
        routers: RouterObject[],
        options: AppOptions = { useMongoDB: true, useSocketIO: false }
    ) {
        this.app = express();
        this.port = port;
        this.dburl = dburl;
        this.server = new http.Server(this.app);
        this.routers = routers;
        this.options = options;
        this.initializeMiddlewares();
        this.initializeRouters();
        this.initializeDB();
        if (this.options.useSocketIO) {
            this.io = new Server<
                ClientToServerEvents,
                ServerToClientEvents,
                InterServerEvents,
                SocketData
            >(this.server);
            this.initializeSocket();
        }
    }
    //Mongo DB
    private initializeDB() {
        db.connect(this.dburl);
    }
    //Middlewares
    private initializeMiddlewares() {
        this.app.use(
            cors({
                origin: "http://localhost:5173",
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
                credentials: true,
            })
        );
        this.app.use(cookieParser());
        this.app.use(helmet());
        this.app.disable("x-powered-by");
        this.app.use(bodyParser.json({ limit: "60mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "60mb" }));
    }
    //Routers
    private initializeRouters() {
        const routes = new AppRouter(this.app);
        routes.initialize(this.routers);
    }
    //Websocket
    private initializeSocket() {
        this.io?.on(
            "connection",
            (
                socket: Socket<
                    ClientToServerEvents,
                    ServerToClientEvents,
                    InterServerEvents,
                    SocketData
                >
            ) => {
                console.log("Connected to Socket");
                //Handle socket events here
            }
        );
    }
    //Listen app
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
