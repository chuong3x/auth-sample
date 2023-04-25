import { RouterObject } from "../../types";

import AuthRouter from "./auth";
import HomeRouter from "./home";
import UploadRouter from "./file";
import DocRouter from "./doc";

const routes: RouterObject[] = [
    {
        path: "/api/doc",
        router: new DocRouter().getRouter(),
    },
    {
        path: "/api/file",
        router: new UploadRouter().getRouter(),
    },
    {
        path: "/api/auth",
        router: new AuthRouter().getRouter(),
    },
    {
        path: "/api",
        router: new HomeRouter().getRouter(),
    },
];

export default routes;
