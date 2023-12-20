import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BestCreator.css";

export default function BestCreator() {
  const axiosPublic = useAxiosPublic();
  const { data: allData = [] } = useQuery({
    queryKey: ["bestCreator"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bestCreators`);
      return res.data;
    },
  });
  const contestData = allData.selectedContests;
  const moderatorData = allData.selectedModerators;
  const moderatorsEmail = allData.moderatorsEmail;

  let newData = [];
  for (let i = 0; i < moderatorData?.length; i++) {
    const creator = contestData?.find(
      (contest) => contest.creatorEmail == moderatorsEmail[i]
    );
    newData.push(creator);
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mb-20 mx-10 lg:mx-0">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-5 mt-10">
        Best Creators
      </h2>
      <div className="">
        <Slider {...settings}>
          {moderatorData?.map((partner, index) => (
            <div
              key={partner._id}
              className="bg-white border-2 border-primary cursor-pointer transition duration-1000 rounded-xl"
            >
              <div className="rounded-t-xl h-56 bg-secondary flex justify-center items-center">
                <img
                  src={partner?.photo}
                  className="h-44 w-44 rounded-full object-cover"
                  alt=""
                />
              </div>
              <div className="rounded-b-xl p-4 space-y-2">
                <h2 className="text-2xl font-bold text-primary">
                  Creator Name: {partner?.name}
                </h2>
                <h2 className="text-2xl font-bold ">
                  Contest Name: {newData[index]?.contestName}
                </h2>
                <p className="font-medium">
                  <span className="font-semibold">Description: </span>

                  <span className="text-gray-500">
                    {newData[index]?.contestDescription?.slice(0, 200)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
