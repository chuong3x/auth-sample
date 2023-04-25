import { Router } from "express";
import * as File from "../../controllers/FileController";
import { multer } from "../../middlewares/upload";
import { verifyAccessToken } from "../../utils/auth";

class HomeRouter {
    private _router: Router;
    constructor() {
        this._router = Router();
        this.initializeRouter();
    }
    private initializeRouter() {
        this._router.post(
            "/upload",
            verifyAccessToken,
            multer.single("file"),
            File.upload
        );
        this._router.get("/", verifyAccessToken, File.get);
    }
    public getRouter() {
        return this._router;
    }
}
export default HomeRouter;
