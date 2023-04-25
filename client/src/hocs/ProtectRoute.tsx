import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { authSelector } from "../redux/auth.slice";

interface ProtectRouteProps {
    children: ReactElement<any, any> | null;
}
const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const { token } = useAppSelector(authSelector);

    return token ? children : <Navigate to="/" replace={true} />;
};

export default ProtectRoute;
