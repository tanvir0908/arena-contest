import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function ContestDetails() {
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const { data: contest = [] } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contest/${location.state}`);
      return res.data;
    },
  });
  console.log(contest);
  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Contest Details
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-5" />
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <img
            className="w-full h-[45rem] rounded-xl object-cover"
            src={contest.contestPhoto}
            alt=""
          />
        </div>
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold">
            Contest Name: {contest.contestName}
          </h2>
          <p className="font-bold text-xl">
            contest Price: {contest.contestPrice}
          </p>
          <p className="font-bold text-xl">Prize Money: {contest.priceMoney}</p>
          <p className="font-bold text-xl">
            Contest Type: {contest.contestType}
          </p>
          <p className="font-bold text-xl">
            Contest Deadline: {contest.contestDeadline}
          </p>
          <p className="font-bold text-xl">
            Participation Count: {contest.participationCount}
          </p>
          <p className="font-bold text-xl">Creator: {contest.creatorEmail}</p>
          {contest.contestWinnerEmail ? (
            <p className="font-bold text-xl">Winner: {contest.contestName}</p>
          ) : (
            ""
          )}
          <p className="font-bold text-xl">
            Description:{" "}
            <span className="text-gray-500 font-medium">
              {contest.contestDescription}
            </span>
          </p>
          <button className="bg-primary px-5 py-3 text-white font-bold rounded-xl">
            <Link to={"/payment"}>Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
