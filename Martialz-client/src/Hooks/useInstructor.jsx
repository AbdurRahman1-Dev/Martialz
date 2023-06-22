import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../apis/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
  const {user, loading} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {data: isInstructor, isLoading: instructorLoading} = useQuery({
    queryKey: ['isInstructor', user?.email],
    enabled: !loading &&!!user?.email &&!!localStorage.getItem('access-token'),
    queryFn: async () => {
      if(!user) {
        return false
      }
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`)
      return res.data.instructor;
    }
  })
  return [isInstructor, instructorLoading]
};

export default useInstructor;