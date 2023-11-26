import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

export default function ManageContest() {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contest`);
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    console.log(id);
    const res = await axiosPublic.patch(`/contest/${id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      toast.success("Contest approved successfully");
    }
  };

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
        All Contests: {contests.length}
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <table className="w-full">
        <thead className="bg-secondary">
          <tr className="">
            <th className="p-3 rounded-l-xl">#</th>
            <th>Picture</th>
            <th>Contest Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr className="font-medium" key={contest._id}>
              <td className="mx-auto text-center">{index + 1}</td>
              <td>
                <img
                  className="w-[10rem] h-[5rem] mt-3 overflow-hidden rounded-xl mx-auto object-cover"
                  src={contest?.contestPhoto}
                  alt=""
                />
              </td>
              <td className="mx-auto text-center">{contest?.contestName}</td>
              <td className="mx-auto text-center">{contest?.contestType}</td>
              <td className="mx-auto text-center">{contest?.contestPrice}</td>
              <td className="mx-auto text-center">{contest?.creatorEmail}</td>
              <td className="mx-auto text-center">{contest?.status}</td>
              <td className="mx-auto text-center">
                <button
                  onClick={() => handleDelete(contest._id)}
                  className="border bg-red-500 text-white p-2 text-lg rounded-xl"
                >
                  <MdDelete />
                </button>
              </td>
              <td className="mx-auto text-center">
                <button
                  onClick={() => handleApprove(contest._id)}
                  className="border bg-green-500 text-white font-medium px-3 py-2 rounded-xl"
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
