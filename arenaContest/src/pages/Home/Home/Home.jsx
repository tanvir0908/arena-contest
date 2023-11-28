import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import BestCreator from "../BestCreator/BestCreator";
import PopularContest from "../PopularContest/PopularContest";
import ContestAdvertisement from "./ContestAdvertisement/ContestAdvertisement";

export default function Home() {
  return (
    <div>
      <Banner />
      <PopularContest />
      <ContestAdvertisement />
      <BestCreator />
      <Footer />
    </div>
  );
}
