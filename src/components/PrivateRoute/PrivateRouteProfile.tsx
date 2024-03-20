
import { useAppSelector } from "../hooks/redux"
import { Navigate,Outlet } from "react-router-dom";
const PrivateRouteProfile = () => {
    const isAuth = useAppSelector(state => state.UserSlice.isAuth);
    const completeEdit = useAppSelector(state => state.Aritcles.createFinal)
    const confirmDelete = useAppSelector(state => state.Aritcles.statusDelete)
    const editStatus = useAppSelector(state => state.Aritcles.articleEditStatus)
    return (
        isAuth && !completeEdit && !confirmDelete && !editStatus ? <Outlet/> : <Navigate to = '/articles'/>
    )
}
export default PrivateRouteProfile