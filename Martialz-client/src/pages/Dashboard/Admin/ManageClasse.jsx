import { useContext } from "react";
import Title from "../../../components/shared/Title";
import ManageClassTable from "./ManageClassTable";
import useAxiosSecure from "../../../apis/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const ManageClasses = () => {
  const {user} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();


  const {refetch, data: allClass = []} = useQuery({
    queryKey: ['allclasses', user?.email],
    queryFn: async () => {
      const res = await axiosSecure('/allclasses')
      return res.data
    }
  })

  

  return (
    <div>
    <Title title={'Manage All Classes'}></Title>

    <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg">
    <table className="table w-full overflow-x-auto table-zebra">
      {/* head */}
      <thead className="bg-slate-900 text-white">
      <tr>
        <th>
          #
        </th>
        <th>Name</th>
        <th>Instructor</th>
        <th>Available Seats</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>

  
      {
        allClass?.map((classes, i) => <ManageClassTable classes={classes} i={i} key={classes?._id} refetch={refetch} ></ManageClassTable>)
      }
      </tbody>
    </table>
  </div>
  
  </div>
  );
};

export default ManageClasses;