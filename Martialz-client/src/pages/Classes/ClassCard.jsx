import { useContext } from "react";
import { FaUserClock} from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion"
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";

const ClassCard = ({classes}) => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstructor()

  const handleSelect = (classes) => {

    const studentEmail = user?.email;

    const {name, _id, email, className, availableSeats, price, classImage, status, students} = classes;

    const classInfo = {
      name,
      email,
      classImage,
      className,
      availableSeats,
      price,
      status: 'Payment pending',
      students,
      classId: _id,
      studentEmail
    }

      fetch(`${import.meta.env.VITE_URL}/selectclasses`, {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(classInfo),
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId) {
        toast.success('Class Selected')
      }
      else{
        toast.error('Already Selected')
      }
    })
  }

  return (
    <motion.div
    initial={{ opacity: 0,scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false }}
    transition={{ duration: 0.4}}
   
    className="card md:w-96 bg-base-100 shadow-xl relative">
  <figure><img className="w-full h-[250px] md:h-[300px] object-cover object-top" src={classes?.classImage} alt="class" /></figure>

  <div className= {`${classes?.availableSeats < 1 ? 'card-body bg-red-500' : 'card-body'}`}>
    <h2 className="card-title inline-block">
      {classes?.className}
      <div className="badge inline-block badge-error text-white">${classes?.price}</div>
    </h2>
   <div>
    <div className="flex items-center gap-3 py-4">
    <img className=" w-12 h-12 object-cover  rounded-full" src={classes?.instructorImg} alt="" />
    <p>Instractor: {classes?.name} </p>
    </div>
    <div className="flex py-2 items-center gap-2 justify-between">
    <p className="text-lg font-semibold text-slate-900 flex itec">  Available Seats: {classes?.availableSeats} </p>
    <FaUserClock className="text-2xl inline-block text-error"></FaUserClock>
    </div>
   </div>
<div>
  {
    user ? <>
      {
        classes?.availableSeats < 1 ? <> <button className="w-full bg-red-700 btn disabled text-white btn-disabled">Not Avaiable</button></> : <>

        {
        isAdmin || isInstructor ? <button className="w-full  btn disabled text-white btn-disabled">You Can't select</button> :
         <button onClick={() => handleSelect(classes)} className="btn btn-outline w-full">Select Now</button>
        }
       

        </>
      }
    </>
     :<Link to={'/login'} className="btn btn-outline w-full">
      Login to Enroll
    </Link>
  }
  
</div>
  </div>
</motion.div>
  );
};

export default ClassCard;