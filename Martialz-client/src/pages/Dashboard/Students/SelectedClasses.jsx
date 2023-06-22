import { useContext, useState } from "react";
import Title from "../../../components/shared/Title";
import { AuthContext } from "../../../Provider/AuthProvider";
import SelectTable from "./SelectTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
  const {user} = useContext(AuthContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
 
  const {refetch, data: selectedClass = []} = useQuery({
    queryKey: ['selectclass', user?.email],
    queryFn: async () => {
      axios.get(`${import.meta.env.VITE_URL}/selectclass/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      })
      .then(function (response) {
       setSelectedClasses(response.data)
      })
      .catch(function (error) {
        toast.error(error);
      })
    }
  })

  return (
    <div>
      <Title title={'Selected Classes'}></Title>

{
 selectedClasses.length < 1 ? <>
  <div className="text-center text-3xl font-bold"> <h3>You don't have select any classes yeat!</h3>
  
  <Link to={'/classes'} className="btn btn-error my-4">Select Now</Link>
  </div>
   </> :       <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 ">
  <table className="table w-full overflow-x-auto table-zebra">
    {/* head */}
    <thead className=" bg-[#0f172a] text-white">
      <tr>
        <th>
          #
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Price</th>
        <th>Payment</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>


      {
        selectedClasses?.map((selected ,i)=> <SelectTable selected={selected} key={selected._id} i={i} refetch={refetch} ></SelectTable>)
      }

    </tbody>
  </table>
</div>

}

    </div>
  );
};

export default SelectedClasses;