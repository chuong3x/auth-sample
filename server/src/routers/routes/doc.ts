import { Router } from "express";
import * as Doc from "../../controllers/DocController";

class DocRouter {
    private _router: Router;
    constructor() {
        this._router = Router();
        this.initializeRouter();
    }
    private initializeRouter() {
        this._router.post("/", Doc.postParams);
        this._router.get("/:id", Doc.getParams);
    }
    public getRouter() {
        return this._router;
    }
}
export default DocRouter;
