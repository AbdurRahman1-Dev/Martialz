import { MdOutlineDashboard } from "react-icons/md";
import Nav from "../components/shared/Navbar/Nav";
import Container from "./Container";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, FaRegClone, FaRegCaretSquareRight, FaPhoneAlt,FaClipboardList,FaRegCalendarCheck,FaCheckCircle,FaHistory, FaEdit, FaUserEdit,FaSignOutAlt } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useInstructor from "../Hooks/useInstructor";
import Footer from "../components/shared/footer/Footer";

const Dashboard = () => {
  const {user, logOut} = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const navItems = <>
  {/* instructors dashboard items */}
      {isInstructor && <>
      <li><NavLink className="inline-block" to={'addclass'}> <FaRegClone className="inline-block text-2xl text-error"></FaRegClone> Add Classes</NavLink></li>
      <li><NavLink to={'myclasses'}> <FaRegCaretSquareRight className="inline-block text-2xl text-error"></FaRegCaretSquareRight> My Classes</NavLink></li>
      </>}
   {/*Admin dashboard items  */}
    {
      isAdmin && <>
     <li><NavLink to={'manageclasses'}><FaEdit className="inline-block text-2xl text-error"></FaEdit> Manage Classes</NavLink></li>
    <li><NavLink to={'manageusers'}><FaUserEdit className="inline-block text-2xl text-error"></FaUserEdit> Manage Users</NavLink></li>
      </>
    }

{/* students dashboard items */}
    {
      !isAdmin && !isInstructor && <>
      <li><NavLink to={'selectedclasses'}><FaRegCalendarCheck className="inline-block text-2xl text-error"></FaRegCalendarCheck> Selected Classes</NavLink></li>
      <li><NavLink to={'enrolledclasses'}><FaCheckCircle className="inline-block text-2xl text-error"></FaCheckCircle>  Enrolled Classes</NavLink></li>
      <li><NavLink to={'paymenthistory'}><FaHistory className="inline-block text-2xl text-error"></FaHistory>  Payment History</NavLink></li>

      </>
    }

  </>

  return (
    <>
    <Nav></Nav>
    <Container>
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ms-5 mb-16">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden me-auto"><MdOutlineDashboard className="text-2xl"></MdOutlineDashboard></label>
      {/* Page content here */}

      <Outlet></Outlet>
  </div> 
  <div className="drawer-side z-50 fixed">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-2/3 md:w-64 h-full bg-[#0f172a] text-white">
    {user &&  <div className="avatar mx-auto border-4 border-error p-2 rounded-full border-dashed">
  <div title={user?.displayName} className="w-20 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>}
<div className="text-center text-2xl py-5 font-semibold text-white">
  <h3>{user?.displayName}</h3>
  <p className="text-center text-sm text-slate-20000">{user?.email}</p>
  </div>
      {/* Sidebar content here */}
    {navItems}

    <hr className="my-5"/>
   
    <li><Link to={'/'}><FaHome className="inline-block text-2xl text-error"></FaHome> Home</Link></li>
    <li><Link to={'/'}><FaPhoneAlt className="inline-block text-2xl text-error"></FaPhoneAlt> Contact</Link></li>
    <li><Link to={'/'}><FaClipboardList className="inline-block text-2xl text-error"></FaClipboardList> About</Link></li> 

   <button className="btn btn-sm" onClick={logOut}><FaSignOutAlt className="rotate-180 inline-block text-2xl text-error"></FaSignOutAlt>LogOut</button>
 </ul>
</div>
</div>
</Container>

<Footer></Footer>
    </>
  );
};

export default Dashboard;