
import { useAppSelector } from "../hooks/redux"
import { Navigate,Outlet } from "react-router-dom";
const PrivateRoute = () => {
    const isAuth = useAppSelector(state => state.UserSlice.isAuth);

    return (
        !isAuth ? <Outlet/> : <Navigate to = '/articles'/>
    )
}
export default PrivateRoute