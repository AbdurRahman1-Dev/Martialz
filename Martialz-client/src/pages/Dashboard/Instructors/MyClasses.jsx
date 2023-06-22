import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import Title from "../../../components/shared/Title";
import ClassTable from "./ClassTable";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const {user} = useContext(AuthContext)
  const [allClasses, setClasses] = useState([]);

  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_URL}/classes/${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    })
    .then(function (response) {
      // handle success
      setClasses(response.data)
    })
    .catch(function (error) {
      // handle error
      toast.error(error);
    })
  },[user])

  return (

<div>
  <Title title={'My Uploded Classes'}></Title>

    {allClasses.length < 1 ? <>
   <div className="text-center text-3xl font-bold"> <h3>You Don't have Upload any Class yeat</h3>
   
   <Link to={'/dashboard/addclass'} className="btn btn-error my-4">Add Now</Link>
   </div>
    </>  :
    
  <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg">
  <table className="table w-full overflow-x-auto table-zebra">
    {/* head */}
    <thead className="bg-slate-900 text-white">
      <tr>
        <th>
          #
        </th>
        <th>Name</th>
        <th>Enrolled Students</th>
        <th>Status</th>
        <th>Feedback</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>

    {
      allClasses?.map((classes, i) => <ClassTable key={classes?._id} classes={classes} i={i}></ClassTable>)
    }
    </tbody>
  </table>
</div>
}
</div>


  )
};

export default MyClasses;