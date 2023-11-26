import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const axiosPublic = useAxiosPublic();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users`);
      return res.data;
    },
  });

  const handleChangeRole = async (e) => {
    e.preventDefault();
    const form = e.target;
    const changeRole = {
      id: form.id.value,
      role: form.role.value,
    };

    // change users role
    const res = await axiosPublic.patch("/users", changeRole);
    if (res.data.modifiedCount > 0) {
      refetch();
      toast.success("Role changed successfully");
    }
  };

  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        All Users: {users.length}
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <table className="w-full">
        <thead className="bg-secondary">
          <tr className="">
            <th className="p-3 rounded-l-xl">#</th>
            <th>Picture</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Role</th>
            <th>Edit Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="font-medium" key={user._id}>
              <td className="mx-auto text-center">{index + 1}</td>
              <td>
                <img
                  className="w-[5rem] h-[5rem] mt-3 overflow-hidden rounded-xl mx-auto object-cover"
                  src={user?.photo}
                  alt=""
                />
              </td>
              <td className="mx-auto text-center">{user?.name}</td>
              <td className="mx-auto text-center">{user?.email}</td>
              <td className="mx-auto text-center">{user?.role}</td>
              <td className="mx-auto text-center">
                <form onSubmit={handleChangeRole}>
                  <input
                    type="text"
                    defaultValue={user._id}
                    className="hidden"
                    name="id"
                  />
                  <select
                    defaultValue={user.role}
                    name="role"
                    className="px-2 py-2 rounded-xl font-medium outline-none border-2 border-primary"
                  >
                    <option disabled defaultValue={"gaming"}>
                      User Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                  </select>
                  <button className="bg-primary border-2 border-secondary px-2 py-2 rounded-xl font-medium text-white ">
                    Change
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
