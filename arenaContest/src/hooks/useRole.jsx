import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

export default function useRole() {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: isRole, isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user?.email}`);
      return res?.data?.role;
    },
  });
  return { isRole, isRoleLoading };
}
