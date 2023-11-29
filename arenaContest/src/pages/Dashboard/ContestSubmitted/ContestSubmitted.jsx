import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function ContestSubmitted() {
  const contest = useLoaderData();
  const axiosPublic = useAxiosPublic();

  const {
    data: participants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["participantsDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/registerParticipants?id=${contest?._id}`
      );
      return res.data;
    },
  });

  const handleWinner = async (email) => {
    const updateWinner = {
      id: contest._id,
      email,
    };
    updateWinner;
    const res = await axiosPublic.patch("/updateWinner", updateWinner);
    if (res.data.modifiedCount) {
      toast.success("Winner selected");
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center text-primary">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Participants: {participants.length}
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <table className="w-full">
        <thead className="bg-secondary">
          <tr className="">
            <th className="p-3 rounded-l-xl">#</th>
            <th>Picture</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Contest Name</th>
            <th>Deadline</th>
            <th className="rounded-r-xl">Make Winner</th>
          </tr>
        </thead>
        <tbody>
          {participants?.map((participants, index) => (
            <tr className="font-medium" key={participants._id}>
              <td className="mx-auto text-center">{index + 1}</td>
              <td>
                <img
                  className="w-[5rem] h-[5rem] mt-3 overflow-hidden rounded-xl mx-auto object-cover"
                  src={participants?.userPhoto}
                  alt=""
                />
              </td>
              <td className="mx-auto text-center">{participants?.userName}</td>
              <td className="mx-auto text-center">{participants?.userEmail}</td>
              <td className="mx-auto text-center">{contest?.contestName}</td>
              <td className="mx-auto text-center">
                {contest?.contestDeadline}
              </td>
              <td className="mx-auto text-center">
                <button
                  onClick={() => handleWinner(participants?.userEmail)}
                  disabled={contest?.contestWinnerEmail}
                  className="bg-primary border-2 border-secondary px-2 py-2 rounded-xl font-medium text-white "
                >
                  Make Winner
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
