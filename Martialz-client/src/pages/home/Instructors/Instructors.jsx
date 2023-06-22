import { useEffect, useState } from "react";
import Container from "../../../Layout/Container";
import { FaFacebook, FaLinkedin, FaInstagram} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import Title from "../../../components/shared/Title";
import { motion } from "framer-motion"

const Instructors = ({slice}) => {
  const [instructors, steInstractors] = useState([])

  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_URL}/instructors`)
    .then(function (response) {
      // handle success
      steInstractors(response.data)
    })
    .catch(function (error) {
      // handle error
      toast.error(error);
    })
  },[])

  return (
    <div className="mt-24">
      <Container>
      <Title title={'Our Popular Instructors'}></Title>

    <div className="grid gridcol md:grid-cols-2 lg:grid-cols-3 gap-5 mb-32 ">
    {
      instructors?.slice(0,slice)?.map(instructor => <motion.div
        initial={{ opacity: 0,scale: 0.8 }}
       whileInView={{ opacity: 1, scale: 1  }}
       viewport={{ once: false }}
       transition={{ duration: 0.4}}

      key={instructor._id} className="card card-compact md:w-96 bg-[#0d111e] shadow-xl">
      <figure><img className="w-full md:h-80 h-72 object-top object-cover" src={instructor?.photoURL} alt="Shoes" /></figure>
      <div className="card-body text-center">
        <h2 className="text-3xl font-semibold text-center text-white">{instructor?.name}</h2>
        <p className="text-slate-400">{instructor?.email}</p>
      <div className="text-2xl py-4 text-slate-200 flex justify-center items-center gap-6"> 
        <FaFacebook className="hover:text-error"></FaFacebook>
        <FaLinkedin className="hover:text-error"></FaLinkedin>
        <FaInstagram className="hover:text-error"></FaInstagram>
      </div>
      </div>
    </motion.div>)

    }
    </div>
 </Container>
    </div>
  );
};

export default Instructors;