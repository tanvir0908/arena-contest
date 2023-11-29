import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ContestCard from "../../../components/ContestCard/ContestCard";

export default function PopularContest() {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/popularContests`);
      return res.data;
    },
  });

  return (
    <div className="my-20">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Most Popular Contests
      </h2>
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-10">
          {contests?.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
