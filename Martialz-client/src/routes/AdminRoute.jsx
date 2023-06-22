import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../Provider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import Loading from '../components/shared/Loading';

const AdminRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoading] = useAdmin()
  const location = useLocation();

  if (loading || adminLoading) {
    return <Loading></Loading>
  }

  if (user && isAdmin) {
    return children
  }
 return <Navigate to='/login'></Navigate>
};

export default AdminRoute;