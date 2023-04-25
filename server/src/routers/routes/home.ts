import { Router } from "express";
import * as Home from "../../controllers/HomeController";

class HomeRouter {
    private _router: Router;
    constructor() {
        this._router = Router();
        this.initializeRouter();
    }
    private initializeRouter() {
        this._router.get("/", Home.homeController);
    }
    public getRouter() {
        return this._router;
    }
}
export default HomeRouter;
