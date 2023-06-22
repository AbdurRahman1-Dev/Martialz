import { FaCheckCircle, FaRegEdit, FaBan } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";


const ManageClassTable = ({classes, i, refetch}) => {

  const handleApprove = (classes) => {
    fetch(`${import.meta.env.VITE_URL}/approveclass/${classes?._id}`, {
      method: 'PATCH',
    })
    .then(res => res.json())
    .then(() => {
      
      refetch()
      toast.success(`${classes?.className} is Approved`);
    })
  } 
  
  const handleDied = (classes) => {
    fetch(`${import.meta.env.VITE_URL}/deniedclass/${classes?._id}`, {
      method: 'PATCH',
    })
    .then(res => res.json())
    .then(() => {
      
      refetch()
      toast.error(`${classes?.className} is Denied`);
    })
  }

 
  return (
    <tr>
    <th>
     {1 + i}
    </th>
    <td>
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={classes?.classImage} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div className="font-bold">{classes?.className}</div>
          <div className="text-sm opacity-50">${classes?.price}</div>
        </div>
      </div>
    </td>
    <td>
      <div className="flex items-center space-x-3">
        <div>
          <div className="font-bold">{classes?.name}</div>
          <div className="text-sm opacity-50">{classes?.email}</div>
        </div>
      </div>
    </td>
    <td className="">
      {classes?.availableSeats}
    </td>
    <th>
      <button className="btn btn-ghost btn-xs">{classes?.status}</button>
    </th> 
    <th>
      <div className="space-x-2 flex">
        <button className={`${classes?.status === 'approved' || classes?.status === 'denied' ? 'rounded-full btn-disabled' : 'text-success'}`} onClick={()=>handleApprove(classes)} title="Approve"><FaCheckCircle 
        className="text-2xl"></FaCheckCircle></button>

        <button className={`${classes?.status === 'denied' || classes?.status === 'approved' ? 'rounded-full btn-disabled' : 'text-error'}`} onClick={()=>handleDied(classes)} title="Deny"><FaBan
        className="text-2xl"></FaBan></button>
        
  
        <Link to={`/dashboard/feedback/${classes?._id}`} title="FeedBack"><FaRegEdit className="text-info text-2xl"></FaRegEdit></Link>
      </div>
    </th>
  </tr>
  );
};

export default ManageClassTable;