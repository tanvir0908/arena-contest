import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "./Banner.css";
import { useState } from "react";
import ContestCard from "../../../components/ContestCard/ContestCard.jsx";

export default function Banner() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const [searchResult, setSearchResult] = useState([]);

  const onSubmit = async (data) => {
    if (data.searchText === "Business Contest") {
      data.searchText = "business";
    }
    if (data.searchText === "Medical Contest") {
      data.searchText = "medical";
    }
    if (data.searchText === "Article Writing") {
      data.searchText = "article";
    }
    if (data.searchText === "Gaming") {
      data.searchText = "gaming";
    }
    const res = await axiosPublic.get(`/approvedContests/${data.searchText}`);
    setSearchResult(res.data);
    reset();
  };

  const handleClear = () => {
    setSearchResult([]);
  };

  return (
    <div className="">
      <div className="py-64 rounded-xl background object-cover">
        <h2 className="text-center text-4xl font-bold text-primary mb-10">
          Looking For Contest? Search Now.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto text-center">
          <input
            {...register("searchText", { required: true })}
            type="text"
            name="searchText"
            className="border w-[25rem] h-[3rem] px-3 py-2 rounded-l-xl outline-none border-primary"
          />
          <button className="rounded-r-xl w-[10rem] h-[3rem] bg-primary px-3 py-2 font-semibold text-white">
            Search
          </button>
        </form>
        <div className="text-center mt-2">
          {errors.searchText && (
            <span className="text-center text-red-500 mt-2 font-medium">
              This field is required
            </span>
          )}
        </div>
        <div className="text-center mt-5">
          <button
            onClick={handleClear}
            className="w-[15rem] h-[3rem] bg-red-500 rounded-xl font-semibold text-white"
          >
            Clear Search Result
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-10">
        {searchResult?.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
}
