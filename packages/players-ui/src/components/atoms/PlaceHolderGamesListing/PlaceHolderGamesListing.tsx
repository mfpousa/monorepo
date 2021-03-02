import React from "react";

import "./PlaceHolderGamesListing.scss";

const PlaceHolderGamesListing = () => {
  return (
    <div className="placeholderGameCard">
      <div className="content-1">
        <div className="image" />
        <div className="content-lines">
          <div className="line1" />
          <div className="line2" />
        </div>
      </div>
      <div className="tails" />
      <div className="content-1">
        <div className="image" />
        <div className="content-lines">
          <div className="line1" />
          <div className="line2" />
          <div className="line2" />
        </div>
      </div>
      <div className="rectangle" />
    </div>
  );
};

export default PlaceHolderGamesListing;
