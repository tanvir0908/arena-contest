import { Link } from "react-router-dom";

export default function ContestCard({ contest }) {
  const {
    _id,
    contestName,
    contestPhoto,
    participationCount,
    contestPrice,
    contestDescription,
  } = contest;
  return (
    <div className="text-left bg-secondary hover:scale-105 transition-all duration-500 cursor-pointer rounded-xl">
      <img
        className="w-full h-[15rem] rounded-xl object-cover"
        src={contestPhoto}
        alt=""
      />
      <div className="pt-3 pb-5 px-5 space-y-2">
        <h2 className="text-xl font-semibold">Contest Name: {contestName}</h2>
        <p className="font-medium text-lg">
          <span className="font-semibold">Participants: </span>
          {participationCount}
        </p>
        <p className="font-medium text-lg">
          <span className="font-semibold">Contest Price:</span> ${contestPrice}
        </p>
        <p className="font-medium">
          <span className="font-semibold">Description: </span>

          <span className="text-gray-500">
            {contestDescription.slice(0, 200)}
          </span>
        </p>
        <Link to={`/allContest/${_id}`}>
          <button className="border-2 border-primary text-lg font-semibold px-3 py-1 rounded-xl mt-5 text-primary">
            Contest Details
          </button>
        </Link>
      </div>
    </div>
  );
}
