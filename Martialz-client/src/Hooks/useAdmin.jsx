import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../apis/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const {user, loading} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {data: isAdmin, isLoading: adminLoading} = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !loading &&!!user?.email &&!!localStorage.getItem('access-token'),
    queryFn: async () => {
      if(!user) {
        return false
      }
      const res = await axiosSecure.get(`/users/admin/${user?.email}`)
      return res.data.admin;
    }
  })
  return [isAdmin, adminLoading]
};

export default useAdmin;