import { useAppSelector } from '../hooks/redux';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRouteDelete = () => {
  const confirmDelete = useAppSelector((state) => state.Aritcles.statusDelete);
  return !confirmDelete ? <Outlet /> : <Navigate to="/articles" />;
};
export default PrivateRouteDelete;
