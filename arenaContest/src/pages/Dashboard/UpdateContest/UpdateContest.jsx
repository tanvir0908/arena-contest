import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

export default function UpdateContest() {
  const contest = useLoaderData();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // submit function
  const onSubmit = (data) => {
    const updateContest = {
      id: contest?._id,
      contestName: data.contestName,
      contestPhoto: data.contestPhoto,
      contestPrice: data.contestPrice,
      priceMoney: data.priceMoney,
      contestType: data.contestType,
      contestDeadline: data.contestDeadline,
      contestDescription: data.contestDescription,
      participationCount: contest?.participationCount,
      status: contest?.status,
      creatorEmail: user.email,
      contestWinnerEmail: contest?.contestWinnerEmail,
    };

    // store users information into database
    axiosPublic.patch("/updateContest", updateContest).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Contest updated successfully");
        reset();
        navigate("/dashboard/createdContests");
      }
    });
  };

  return (
    <div className="mb-12 flex flex-col justify-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Update Contest
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-8" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 md:px-0 w-10/12 mx-auto"
      >
        {/* name and photo */}
        <div className="flex justify-between gap-10">
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-medium">
              Contest Name<span className="text-red-500">*</span>
            </span>
            <input
              {...register("contestName", { required: true })}
              type="text"
              defaultValue={contest?.contestName}
              placeholder="Enter contest name"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.contestName && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-medium">
              Contest Photo<span className="text-red-500">*</span>
            </span>
            <input
              {...register("contestPhoto", { required: true })}
              type="text"
              defaultValue={contest?.contestPhoto}
              placeholder="Enter photo url"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.contestPhoto && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
        </div>
        {/* contest price and price money */}
        <div className="flex justify-between gap-10 my-5">
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-medium">
              Contest Price<span className="text-red-500">*</span>
            </span>
            <input
              {...register("contestPrice", { required: true })}
              type="number"
              defaultValue={contest?.contestPrice}
              placeholder="Contest price"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.contestPrice && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-medium">
              Price Money<span className="text-red-500">*</span>
            </span>
            <input
              {...register("priceMoney", { required: true })}
              type="number"
              defaultValue={contest?.priceMoney}
              placeholder="Price money"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.priceMoney && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
        </div>
        {/* contest type and deadline */}
        <div className="flex justify-between gap-10 my-5">
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-medium">
              Contest Type<span className="text-red-500">*</span>
            </span>
            <select
              defaultValue={contest?.contestType}
              {...register("contestType", { required: true })}
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            >
              {/* <option disabled defaultValue={"gaming"}>
                Select contest type
              </option> */}
              <option value="business">Business Contest</option>
              <option value="medical">Medical Contest</option>
              <option value="article">Article Writing</option>
              <option value="gaming">Gaming</option>
            </select>
            {errors.contestType && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-medium">
              Contest Deadline<span className="text-red-500">*</span>
            </span>
            <input
              {...register("contestDeadline", { required: true })}
              type="date"
              defaultValue={contest?.contestDeadline}
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.contestDeadline && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-medium">Contest Description</span>
          <textarea
            {...register("contestDescription", { required: true })}
            type="text"
            defaultValue={contest?.contestDescription}
            placeholder="Contest description"
            className="px-4 py-3 h-[15rem] rounded-xl font-medium outline-none border-2 border-primary"
          />
          {errors.contestDescription && (
            <span className="text-center text-red-500 mt-2 font-medium">
              This field is required
            </span>
          )}
        </div>
        <div className="form-control mt-6 ">
          <button className="bg-primary text-white w-full font-semibold py-3 rounded-xl border-2 border-primary">
            Update Contest
          </button>
        </div>
      </form>
    </div>
  );
}
