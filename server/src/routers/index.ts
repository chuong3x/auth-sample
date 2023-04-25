import { Express } from "express";
import { RouterObject } from "../types";
class AppRouter {
    private app: Express;
    constructor(app: Express) {
        this.app = app;
    }
    public initialize(routes: RouterObject[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
}

export default AppRouter;
