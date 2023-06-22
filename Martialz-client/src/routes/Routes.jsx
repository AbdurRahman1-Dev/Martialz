import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../Layout/Dashboard";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp/SignUp";
import AddClass from "../pages/Dashboard/Instructors/AddClass";
import Classes from "../pages/Classes/Classes";
import PrivateRoute from "./PrivateRoute";
import MyClasses from "../pages/Dashboard/Instructors/MyClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasse";
import SelectedClasses from "../pages/Dashboard/Students/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/Students/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/Students/PaymentHistory";
import Payment from "../pages/Dashboard/Students/Payment";
import AdminRoute from "./AdminRoute";
import Instructors from "../pages/home/Instructors/Instructors";
import InstructorRoute from "./InstructorRoute"
import FeedBack from "../pages/Dashboard/Admin/FeedBack";
import UpdateClass from "../pages/Dashboard/Instructors/UpdateClass";
import MinDashBoard from "../pages/Dashboard/MinDashBoard";


  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
          path: '',
          element: <Home></Home>
        },
        {
          path: '/instractors',
          element: <Instructors></Instructors>
        },
        {
          path: '/classes',
          element: <Classes title={'ALl Classes'}></Classes>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: '/dashboard',
          element: <PrivateRoute><MinDashBoard></MinDashBoard></PrivateRoute>
        }, 
        
        {
          path: 'addclass',
          element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
        },
        {
          path: 'myclasses',
          element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
        },
        {
          path: 'updateclass/:id',
          element:<InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/singleclasses/${params.id}`)
        },
        {
          path: 'manageclasses',
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path: 'manageusers',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'feedback/:id',
          element: <AdminRoute><FeedBack></FeedBack></AdminRoute>,
          loader:({params}) => fetch(`${import.meta.env.VITE_URL}/singleclasses/${params.id}`)
        },
        {
          path: 'selectedclasses',
          element: <PrivateRoute><SelectedClasses></SelectedClasses></PrivateRoute>
        },
        {
          path: 'enrolledclasses',
          element: <PrivateRoute><EnrolledClasses></EnrolledClasses></PrivateRoute>
        },
        {
          path: 'paymenthistory',
          element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        },
        {
          path: 'payment/:id',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/payforclass/${params.id}`)
        },
       
      ]
    }
  ]);
  

export default Routes;
