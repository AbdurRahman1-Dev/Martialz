import Container from '../../../Layout/Container';
import logo from '../../../assets//logo-wide.png';
import { FaPhone, FaEnvelope, FaLinkedin, FaMapMarkedAlt,  } from "react-icons/fa";
const Footer = () => {
  return (
<div className='bg-[#0f172a]'>
      <Container>
      <footer className="footer py-20  text-base-content items-center">
  <div className='text-white'>
   <img src={logo} alt="" />
    <p>MAIRTIALZ <br/>Martial Arts School</p>
  </div> 
  <div className='text-white'>
    <span className="footer-title">Contact</span> 
    <a className="link link-hover"> <FaPhone className='inline-block text-xl text-error me-2'/> +1-202-555-0140 </a> 
    <a className="link link-hover"> <FaEnvelope className='inline-block text-xl text-error me-2'/>martial@gmail.com </a>  <a className="link link-hover"> <FaLinkedin className='inline-block text-xl text-error me-2'/>Linkdin</a> 
    
  </div> 
  <div className='text-white'>
    <span className="footer-title">Address</span> 
    <a className="link link-hover"><FaMapMarkedAlt className='inline-block text-xl text-error me-2'/>Los Angeles</a> 
    <a className="link link-hover">Season Street 45/2, </a> 
    <a className="link link-hover">House, 45</a> 

  </div> 
  <div className='text-white'>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
    <a className="link link-hover">Cookie policy</a>
  </div>
  </footer>
</Container>
<div className="footer footer-center p-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
  </div>
</div>
    </div>
  );
};

export default Footer;