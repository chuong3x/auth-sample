import { Router } from "express";
import * as User from "../../controllers/UserController";
import { verifyAccessToken, verifyRefreshToken } from "../../utils/auth";

class AuthRouter {
    private _router: Router;
    constructor() {
        this._router = Router();
        this.initializeRouter();
    }
    private initializeRouter() {
        this._router.get("/check", verifyAccessToken, User.check);
        this._router.post("/login", User.login);
        this._router.post("/logout", verifyAccessToken, User.logout);
        this._router.get("/rf", verifyRefreshToken, User.refreshToken);
        this._router.post("/register", User.register);
    }
    public getRouter() {
        return this._router;
    }
}
export default AuthRouter;
