import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../components/shared/Loading';
import useInstructor from '../Hooks/useInstructor';

const InstructorRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, instructorLoading] = useInstructor()
  const location = useLocation();

  if (loading || instructorLoading) {
    return <Loading></Loading>
  }
  if (user && isInstructor) {
    return children
  }
 return <Navigate to='/login'></Navigate>
};
export default InstructorRoute;