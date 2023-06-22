import { useContext, useState } from "react";
import Title from "../../../components/shared/Title";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const EnrolledClasses = () => {
  const {user} = useContext(AuthContext);
  const [paidClasses, setPaidClasses] = useState([]);


  const {refetch, data: selectedClass = []} = useQuery({
    queryKey: ['paidclasses', user?.email],
    queryFn: async () => {
      axios.get(`${import.meta.env.VITE_URL}/paidclasses/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      })
      .then(function (response) {
        setPaidClasses(response.data)
      })
      .catch(function (error) {
        toast.error(error);
      })
    }
  })


  const handleDeleteClass =(paidclass) => {
    fetch(`${import.meta.env.VITE_URL}/deleteenrolledcl/${paidclass?._id}`,{
      method: 'DELETE',
      headers: {'content-type' : 'application/json'}
    }).then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        refetch()
        toast.success('class Removed')
      }
    })
  }


  return (
    <div>
    <Title title={'MY Classes'}></Title>

{
  paidClasses.length < 1 ? <>
  <div className="text-center text-3xl font-bold"> <h3>You don't have Enrolled any classes yeat!</h3>
  
  <Link to={'/classes'} className="btn btn-error my-4">Enroll</Link>
  </div>
   </> :     <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 ">
<table className="table w-full overflow-x-auto table-zebra">
  {/* head */}
  <thead className="bg-[#0f172a] text-white">
    <tr>
      <th>
        #
      </th>
      <th>Name</th>
      <th>Email</th>
      <th>Price</th>
      <th>Status</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>

    {/* row 1 */}
    {
      paidClasses?.map((paidclass ,i)=> <>
        <tr key={paidclass?._id}>
    <th>
     {1 + i}
    </th>
    <td>
      <div className="flex items-center space-x-3">  
      <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={paidclass?.classImage} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
        <div>
          <div className="font-bold">{paidclass?.className}</div>
          <div className="text-sm opacity-50">${paidclass?.classPrice}</div>
        </div>
      </div>
    </td>
    <td className="">
      {paidclass?.email}
    </td>
    <td>{paidclass?.classPrice}</td>
    <th>
    <p className="btn btn-success btn-xs">{paidclass?.status}</p>
    </th> 
    <th>
      <button
       onClick={()=> handleDeleteClass(paidclass)} 
       className="btn btn-error btn-xs">Remove</button>
    </th>
  </tr></>)
    }

  </tbody>
</table>
</div>
}

  </div>
  );
};

export default EnrolledClasses;