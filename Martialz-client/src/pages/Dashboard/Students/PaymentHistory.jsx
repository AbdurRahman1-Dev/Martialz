import { useContext, useState } from "react";
import Title from "../../../components/shared/Title";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import dateFormat, { masks } from "dateformat";

const PaymentHistory = () => {
  const {user} = useContext(AuthContext);
  const [histories, sethistory] = useState([]);

  const { data: selectedClass = []} = useQuery({
    queryKey: ['paidclasses', user?.email],
    queryFn: async () => {
      axios.get(`${import.meta.env.VITE_URL}/paidclasses/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      })
      .then(function (response) {
       sethistory(response.data)
      })
      .catch(function (error) {
        toast.error(error);
      })
    }
  })

 

  return (
    <div>
    <Title title={'Payment History'}></Title>

    <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 ">
<table className="table w-full overflow-x-auto table-zebra text-center">
  {/* head */}
  <thead className="bg-[#0f172a] text-white">
    <tr>
      <th>
        #
      </th>
      <th>Name</th>
      <th>transactionId</th>
      <th>Price</th>
      <th>Date</th>

    </tr>
  </thead>
  <tbody>

    {/* row 1 */}
    {
      histories?.map((history ,i)=>
       <>
        <tr key={history?._id}>
    <th>
     {1 + i}
    </th>
    <td>
      <div className="flex items-center space-x-3">  
        <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={history?.classImage} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
        <div>
          <div className="font-bold">{history?.className}</div>
          <div className="text-sm opacity-50">${history?.classPrice}</div>
        </div>
      </div>
    </td>
    <td className="">
      {history?.transactionId}
    </td>
    <td>{history?.classPrice}</td>
    <th>
    <p className="btn btn-success btn-xs">{dateFormat(history?.date, "fullDate")}</p>
    </th> 
  </tr></>)
    }

  </tbody>
</table>
</div>
  </div>
  );
};

export default PaymentHistory;