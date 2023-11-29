import { useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { PieChart, Pie, Cell, Legend } from "recharts";
import toast from "react-hot-toast";
const COLORS = ["#0088FE", "#00C49F"];

export default function Profile() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: winningStat, isLoading } = useQuery({
    queryKey: ["userStat"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/winningStat?email=${user?.email}`);
      return res.data;
    },
  });

  const data = [
    {
      name: "Winning Contest",
      value: Number(winningStat?.winningStat),
    },
    {
      name: "Participated Contest",
      value: 100 - Number(winningStat?.winningStat),
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    user.displayName = data.name;
    user.photoURL = data.photo;

    const updateUser = {
      email: user?.email,
      name: data.name,
      photo: data.photo,
    };
    const res = await axiosPublic.patch("/updateUser", updateUser);
    if (res.data.modifiedCount > 0) {
      toast.success("Users information updated successfully");
    }
    reset();
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
        My Profile
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <div className="flex w-10/12 gap-10 mx-auto">
        <div className="flex-1">
          <h2 className="text-center text-2xl font-bold text-primary">
            Profile Details{" "}
          </h2>
          <hr className="border mt-5 mb-5  border-primary mx-auto" />
          <div className="flex p-5 items-center gap-5 justify-center bg-secondary mx-auto rounded-xl">
            <div>
              <img
                className="w-[6rem] rounded-full"
                src={user.photoURL}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold ">
                Name: {user.displayName}
              </h2>
              <h2 className="text-lg font-semibold ">Email: {user.email}</h2>
            </div>
          </div>
          <div className="mt-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-5 md:px-0 mx-auto"
            >
              <div className="flex flex-col">
                <span className="font-medium">Name</span>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  placeholder="Enter your name"
                  className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
                />
                {errors.name && (
                  <span className="text-center text-red-500 mt-2 font-medium">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col my-3">
                <span className=" font-medium">Photo URL</span>
                <input
                  {...register("photo", { required: true })}
                  type="text"
                  defaultValue={user.photoURL}
                  name="photo"
                  placeholder="Enter your photo URL"
                  className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
                />
                {errors.photo && (
                  <span className="text-center text-red-500 mt-2  font-medium">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control mt-6 ">
                <button className="bg-primary text-white w-full font-semibold py-3 rounded-xl border-2 border-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-center text-2xl font-bold text-primary">
            Winning Percentage
          </h2>
          <hr className="border mt-5  border-primary mx-auto" />
          <PieChart className=" mx-auto" width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
