import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/shared/Title";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../apis/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ManageUsers = () => {
  const {user} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  // get all users
  const {refetch, data: users = []} = useQuery({
    queryKey: ['allusers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure('/allusers')
      return res.data
    }
  })

  
// make admin api call
  const makeAdmin = (user) => {
      fetch(`${import.meta.env.VITE_URL}/user/admin/${user?._id}`, {
        method: 'PATCH',
      })
      .then(res => res.json())
      .then(data => {
        if(data.modifiedCount > 0) {
          toast.success(`${user?.name} is Admin Now`);
          refetch()
        } 
      })
  }

  // make instructor api call
  const makeInstructor = (user) => {
    fetch(`${import.meta.env.VITE_URL}/user/instructor/${user?._id}`, {
      method: 'PATCH',
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0) {
        toast.success(`${user?.name} is Instructor Now`);
        refetch()
      } 
    })
  }

  return (
    <div>
      {/* title */}
        <Title title={'Manage Users'}></Title>
      {/* main table */}
   <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg md:p-5">
  <table className="table table-zebra overflow-x-auto text-center">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>


   {
    users?.map((user, i) => <tr key={user._id}>
    <th>{1 + i}</th>
    <td>{user?.name}</td>
    <td>{user?.email}</td>
    <td>{user?.role ? user?.role : 'Student'}</td>
    <td>
      <button onClick={()=>makeAdmin(user)} className={`${user?.role === 'admin' ? "btn btn-sm btn-disabled me-3" : "btn btn-accent btn-sm me-3 mb-3 md:mb-0"}`}>Admin</button>
      <button onClick={()=>makeInstructor(user)} className={`${user?.role === 'instructor' ? "btn btn-sm btn-disabled " : "btn btn-accent btn-sm  md:mb-0"}`}>Instructor</button>
    </td>
    <td>
      <button className="btn btn-error btn-sm">Remove</button>
    </td>
  </tr>)
   }
 
 
    </tbody>
  </table>
</div>
    </div>
  );
};

export default ManageUsers;