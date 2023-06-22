import { Link } from "react-router-dom";
import Container from "../../../Layout/Container";
import { HiMenuAlt1 } from "react-icons/hi";
import logo from '../../../assets//logo-wide.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import {MdOutlineDarkMode, MdLightMode } from "react-icons/md";
const Nav = () => {
  const {user, logOut} = useContext(AuthContext);
  const [dark, setDark] = useState(true)
  const navItems = <>
     <li><Link to={'/'}>Home</Link></li>
     <li><Link to={'/instractors'}>Instructors</Link></li>
     <li><Link to={'/classes'}>Classes</Link></li>
     {user && <li><Link to={'/dashboard '}>Dashboard </Link></li>}
  </>

  return (
  <Container>
<div className="navbar bg-base-100 md:py-4">
  <div className="">
    <div className="dropdown">
    <div className="drawer md:hidden z-40">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer" className="btn p-2 bg-transparent border-0 hover:bg-error text-2xl "><HiMenuAlt1></HiMenuAlt1></label>
  </div> 
  <div className="drawer-side w">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-2/3 h-full bg-base-200 text-xl flex items-center pt-10">

        {user ? <>
        
          <div className="avatar ">
      <div title={user?.displayName} className="w-20 rounded-full">
        <img src={user?.photoURL} />
      </div>
    </div>
   
    <button onClick={logOut} to={'/login'} className="btn btn-error text-white btn-sm my-4 md:btn-md">Log Out</button>
      </> : 
      <Link to={'/login'} className="btn btn-error btn-  text-white md:btn-md">Login</Link>
    }
 
      {navItems}
    </ul>
  </div>
</div>
    </div>
    <Link to={'/'} className=" "><img className="w-64 mx-3 max-w-full" src={logo} alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
 
  </div>
  <div className="navbar-end gap-4 ms-auto">

  {user &&  <div className="avatar hidden md:block">
  <div title={user?.displayName} className="w-14 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>}

{
  dark ? <> <button className="md:btn md:btn-outline " onClick={()=>{
    setDark( !dark)
  // for crome
  document.firstChild.nextSibling.attributes[1].value = 'dark'
    // for firefox
    document.firstChild.nextSibling.attributes[0].nodeValue = 'dark'
  }}><MdOutlineDarkMode className="text-2xl md:text-3xl"></MdOutlineDarkMode></button></>
  : 
   <button className="md:btn md:btn-outline " onClick={() =>{
    setDark(!dark)
    // crome
    document.firstChild.nextSibling.attributes[1].value = 'light'
    // firefox
    document.firstChild.nextSibling.attributes[0].nodeValue = 'light'
   }}><MdLightMode className="text-2xl md:text-3xl"></MdLightMode></button>
}

{
  user ? <button onClick={logOut} className="btn btn-error text-white  btn-md hidden md:block ">Log Out</button> :
  <button  className="btn btn-error text-white btn-md hidden md:block "> <Link to={'/login'}>LogIn</Link></button>
}
  </div>
</div>
</Container>
  );
};

export default Nav;