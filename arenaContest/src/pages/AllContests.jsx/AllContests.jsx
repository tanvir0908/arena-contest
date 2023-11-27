import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import ContestCard from "../../components/ContestCard/ContestCard";

export default function AllContests() {
  const axiosPublic = useAxiosPublic();
  const [tabIndex, setTabIndex] = useState(0);

  const { data: contests = [] } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/approvedContests`);
      return res.data;
    },
  });

  const business = contests?.filter(
    (contest) => contest?.contestType === "business"
  );
  const medical = contests?.filter(
    (contest) => contest?.contestType === "medical"
  );
  const article = contests?.filter(
    (contest) => contest?.contestType === "article"
  );
  const gaming = contests?.filter(
    (contest) => contest?.contestType === "gaming"
  );

  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        All Contests: {contests?.length}
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-5" />
      <Tabs
        className={"text-center w-10/12 mx-auto"}
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>Business Contest</Tab>
          <Tab>Medical Contest</Tab>
          <Tab>Article Writing</Tab>
          <Tab>Gaming</Tab>
        </TabList>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-10">
            {business?.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-10">
            {medical?.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-10">
            {article?.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-10">
            {gaming?.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
