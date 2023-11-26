import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function CreatedContests() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: createdContests = [], refetch } = useQuery({
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contest?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(`/contest/${id}`);
    refetch();
    if (res.data.deletedCount > 0) {
      toast.success("Contest deleted successfully");
    }
  };
  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Created Contests: {createdContests.length}
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <table className="w-full">
        <thead className="bg-secondary">
          <tr className="">
            <th className="p-3 rounded-l-xl">#</th>
            <th>Contest Picture</th>
            <th>Contest Name</th>
            <th>Participants</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
            <th className="rounded-r-xl">Submission</th>
          </tr>
        </thead>
        <tbody>
          {createdContests.map((contest, index) => (
            <tr className="font-medium" key={contest._id}>
              <td className="mx-auto text-center">{index + 1}</td>
              <td>
                <img
                  className="w-[10rem] h-[5rem] mt-3 overflow-hidden rounded-xl mx-auto object-cover"
                  src={contest.contestPhoto}
                  alt=""
                />
              </td>
              <td className="mx-auto text-center">{contest.contestName}</td>
              <td className="mx-auto text-center">
                {contest.participationCount}
              </td>
              <td className="mx-auto text-center">{contest.status}</td>
              <td className="mx-auto text-center">
                <button
                  disabled={contest.status === "accepted"}
                  className="bg-primary text-white border p-2 text-lg rounded-xl"
                >
                  <MdEdit />
                </button>
              </td>
              <td className="mx-auto text-center">
                <button
                  onClick={() => handleDelete(contest._id)}
                  disabled={contest.status === "accepted"}
                  className="border bg-red-500 text-white p-2 text-lg rounded-xl"
                >
                  <MdDelete />
                </button>
              </td>
              <td className="mx-auto text-center">
                <button className="border bg-secondary  p-2 text-lg rounded-xl">
                  <FaFileLines />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
