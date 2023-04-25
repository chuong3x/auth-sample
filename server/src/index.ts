import dotenv from "dotenv";
import App from "./app";
import routes from "./routers/routes";

dotenv.config();

const PORT = process.env.PORT;
const DBURL = process.env.DBURL;

const server = new App(PORT, DBURL, routes, { useSocketIO: true });
server.listen();
