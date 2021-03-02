import React from "react";
import { Header, Footer } from "components/molecules";

import Slogan from "./Slogan";
import GetStarted from "./GetStarted";
import LiveGames from "./LiveGames";
import Venues from "./Venues";
import WhyUs from "./WhyUs";
import VenuePortal from "./VenuePortal";

const Home = () => {
  return (
    <>
      <Header />
      <Slogan />
      <GetStarted />
      <LiveGames />
      <Venues />
      <WhyUs />
      <VenuePortal />
      <Footer />
    </>
  );
};

export default Home;
