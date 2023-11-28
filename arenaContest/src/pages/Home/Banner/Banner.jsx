import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
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
    const res = await axiosPublic.get(`/approvedContests/${data.searchText}`);
    setSearchResult(res.data);
    reset();
  };
  console.log(searchResult);
  //   const axiosPublic = useAxiosPublic();
  //   const { data: contests = [], refetch } = useQuery({
  //     queryKey: ["contest"],
  //     queryFn: async () => {
  //       const res = await axiosPublic.get(`/approvedContests/${type}`);
  //       return res.data;
  //     },
  //   });

  //   useEffect(() => {
  //     fetch(`/approvedContests/${type}`)
  //       .then((res) => res.json)
  //       .then((data) => setData(data));
  //   }, [type]);

  const handleClear = () => {
    // setShow(false);
    setSearchResult([]);
  };

  return (
    <div className="">
      <div className="py-64 rounded-xl background object-cover">
        <h2 className="text-center text-3xl font-bold text-primary mb-5">
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
