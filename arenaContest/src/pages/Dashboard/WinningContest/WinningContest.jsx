import { useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function WinningContest() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: winningContests = [] } = useQuery({
    queryKey: ["registeredContests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/winningContest?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Winning Contests: {winningContests?.length}
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <table className="w-full">
        <thead className="bg-secondary">
          <tr className="">
            <th className="p-3 rounded-l-xl">#</th>
            <th>Picture</th>
            <th>Contest Name</th>
            <th>Contest Price</th>
            <th>Prize Money</th>
            <th>Deadline</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {winningContests.map((contest, index) => (
            <tr className="font-medium" key={contest._id}>
              <td className="mx-auto text-center">{index + 1}</td>
              <td>
                <img
                  className="w-[5rem] h-[5rem] mt-3 overflow-hidden rounded-xl mx-auto object-cover"
                  src={contest?.contestPhoto}
                  alt=""
                />
              </td>
              <td className="mx-auto text-center">{contest?.contestName}</td>
              <td className="mx-auto text-center">{contest?.contestPrice}</td>
              <td className="mx-auto text-center">{contest?.priceMoney}</td>
              <td className="mx-auto text-center">
                {contest?.contestDeadline}
              </td>
              <td className="mx-auto text-center">
                {contest?.participationCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
