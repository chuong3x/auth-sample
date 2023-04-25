import { Express } from "express";
declare global {
    namespace Express {
        export interface Request {
            user?: any;
        }
    }
}
declare class AppRouter {
    private app: Express;
    constructor(app: Express);
    public initialize(routes: RouterObject[]): void;
}
declare interface AppOptions {
    useSocketIO?: boolean;
    useMongoDB?: boolean;
}
export interface RouterObject {
    path: string;
    router: Router;
}

export interface ITokens {
    access: string;
    refresh: string;
    ip: string;
}
