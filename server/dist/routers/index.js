"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppRouter {
    constructor(app) {
        this.app = app;
    }
    initialize(routes) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
}
exports.default = AppRouter;
