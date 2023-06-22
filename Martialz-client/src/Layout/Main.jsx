import { Outlet } from "react-router-dom";
import Nav from "../components/shared/Navbar/Nav";
import Footer from "../components/shared/footer/Footer";

const Main = () => {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;