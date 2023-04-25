import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import FormPage from "../pages/FormPage";

interface IRoute {
    path: string;
    title: string;
    isPrivate: boolean;
    layout?: React.FC<any>;
    element: React.ComponentType<any>;
}
const routes: IRoute[] = [
    {
        path: "/form/:id",
        title: "Dashboard - BEP Creator",
        isPrivate: true,
        layout: MainLayout,
        element: FormPage,
    },
    {
        path: "/dashboard",
        title: "Dashboard - BEP Creator",
        isPrivate: true,
        layout: MainLayout,
        element: DashboardPage,
    },
    {
        path: "/",
        title: "Home - BEP Creator",
        isPrivate: false,
        layout: MainLayout,
        element: HomePage,
    },
    {
        path: "/*",
        title: "404 Not Found - BEP Creator",
        isPrivate: false,
        layout: MainLayout,
        element: NotFoundPage,
    },
];

export default routes;
