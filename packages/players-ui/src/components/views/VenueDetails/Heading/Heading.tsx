import React from "react";
import { Icon } from "components/atoms";
import { FeaturedBar } from "components/molecules";
import { Venue } from "api/venues/Venue";

import "./Heading.scss";
interface HeadingProps {
  venue: Venue;
}

const Heading: React.FC<HeadingProps> = ({ venue }) => {
  // console.log("Type: ", venueDesc);
  return (
    <div className="Heading">
      <div className="title">{venue.name}</div>
      <div className="subtitle">
        Browse and book a venue to practice your favourite sports
      </div>
      <FeaturedBar e={venue} />
      <div className="slideshow">
        <Icon size={2.5}>left</Icon>
        <div className="images">
          <div className="image"></div>
          <div className="image"></div>
          <div className="image"></div>
          <div className="image"></div>
          <div className="image"></div>
        </div>
        <Icon size={2.5}>right</Icon>
        <div className="controls">CONTROLS</div>
      </div>
    </div>
  );
};

export default Heading;
