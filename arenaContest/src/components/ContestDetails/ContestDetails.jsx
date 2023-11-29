// import { useState } from "react";
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import DeadlineTimer from "../DeadlineTimer/DeadlineTimer";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "../../pages/Payment/CheckoutForm";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

export default function ContestDetails() {
  // page start from the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  // const stripePromise = loadStripe(
  //   "pk_test_51OEtWTJ5bzp9GZmm5xo4yISS97TL4G5p7wVEZVzEmSuKZ0ZUHtzSfC5pHoIVNMyS4PrGw8TgtWXo55AeUufIL8YP00frqB01lh"
  // );

  // const location = useLocation();
  // const axiosPublic = useAxiosPublic();
  // const [showPayment, setShowPayment] = useState(false);

  const contest = useLoaderData();

  // const { data: contest = [] } = useQuery({
  //   queryKey: ["contest"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(`/contest/${location.state}`);
  //     return res.data;
  //   },
  // });

  return (
    <div className="mb-20">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Contest Details
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-5" />
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <img
            className="w-full h-[30rem] rounded-xl object-cover"
            src={contest?.contestPhoto}
            alt=""
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">
            Contest Name: {contest?.contestName}
          </h2>
          <p className="font-bold text-xl">
            contest Price: {contest?.contestPrice}
          </p>
          <p className="font-bold text-xl">Prize Money: {contest.priceMoney}</p>
          <p className="font-bold text-xl">
            Contest Type: {contest?.contestType}
          </p>
          <p className="font-bold text-xl">
            Contest Deadline: {contest?.contestDeadline}
          </p>
          <p className="font-bold text-xl">
            <DeadlineTimer deadline={contest?.contestDeadline} />
          </p>
          <p className="font-bold text-xl">
            Participation Count: {contest?.participationCount}
          </p>
          <p className="font-bold text-xl">Creator: {contest?.creatorEmail}</p>
          {contest.contestWinnerEmail ? (
            <p className="font-bold text-xl">
              Winner: {contest?.contestWinnerEmail}
            </p>
          ) : (
            ""
          )}
          <p className="font-bold text-xl">
            Description:{" "}
            <span className="text-gray-500 font-medium">
              {contest.contestDescription}
            </span>
          </p>
          {new Date(contest?.contestDeadline) > new Date() ? (
            <Link to={`/payment/${contest._id}`}>
              <button className="bg-primary mt-5 px-10 py-3 text-white font-bold rounded-xl">
                Register
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
