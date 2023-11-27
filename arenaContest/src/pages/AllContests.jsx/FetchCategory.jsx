import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function FetchCategory({ type }) {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/approvedContests?contestType=${type}`
      );
      return res.data;
    },
  });
  return { contests, refetch };
}
