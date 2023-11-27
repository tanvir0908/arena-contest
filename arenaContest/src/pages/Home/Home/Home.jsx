import Banner from "../Banner/Banner";
import PopularContest from "../PopularContest/PopularContest";
import ContestAdvertisement from "./ContestAdvertisement/ContestAdvertisement";

export default function Home() {
  return (
    <div>
      <Banner />
      <PopularContest />
      <ContestAdvertisement />
    </div>
  );
}
