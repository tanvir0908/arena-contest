import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import "./Banner.css";

export default function Banner() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.searchText == "Business Contest") {
      console.log("business");
    }
    if (data.searchText == "Medical Contest") {
      console.log("medical");
    }
    if (data.searchText == "Article Writing") {
      console.log("article");
    }
    if (data.searchText == "Gaming") {
      console.log("gaming");
    }
    reset();
  };

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
  };

  return (
    <div className="bg-secondary py-64 rounded-xl background object-cover">
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

      {/* <div>Data Length: {data.length}</div> */}
    </div>
  );
}
