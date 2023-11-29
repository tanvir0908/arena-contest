import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";

export default function RegisteredContest() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: registeredContests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["registeredContests"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/registeredContest?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleParticipate = async (id, contestId) => {
    const registerData = {
      id,
      contestId,
    };
    const res = await axiosPublic.patch("registeredContest", registerData);
    if (res.data.modifiedCount > 0) {
      toast.success("Participation successful");
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
        Registered Contests: {registeredContests?.length}
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
            <th className="rounded-r-xl">Participate</th>
          </tr>
        </thead>
        <tbody>
          {registeredContests?.map((register, index) => (
            <tr className="font-medium" key={register._id}>
              <td className="mx-auto text-center">{index + 1}</td>
              <td>
                <img
                  className="w-[5rem] h-[5rem] mt-3 overflow-hidden rounded-xl mx-auto object-cover"
                  src={register?.contestPhoto}
                  alt=""
                />
              </td>
              <td className="mx-auto text-center">{register?.contestName}</td>
              <td className="mx-auto text-center">{register?.contestPrice}</td>
              <td className="mx-auto text-center">{register?.priceMoney}</td>
              <td className="mx-auto text-center">
                {register?.contestDeadline}
              </td>
              <td className="mx-auto text-center">
                {new Date(register?.contestDeadline) > new Date() ? (
                  <button
                    disabled={register?.status === "participated"}
                    onClick={() =>
                      handleParticipate(register?._id, register?.contest_Id)
                    }
                    className="bg-primary text-white px-3 py-2 rounded-xl font-semibold "
                  >
                    {register?.status === "participated"
                      ? "Participated"
                      : "Participate"}
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
