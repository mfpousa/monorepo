import React from "react";
import { Icon } from "components/atoms";
import { SportIcon } from "components/organisms";
import { Venue } from "api/venues/Venue";

import "./FeaturedBar.scss";

const FeaturedBar = ({ e }: { e: Venue }) => {
  return (
    <div className="FeatureBar">
      <div className="sports">
        <SportIcon type={e} isInCard={false} />
        <Icon size={2.5}>add-to-favourite</Icon>
      </div>
      <div className="rating">
        <span>{e.averageRating > 0 ? e.averageRating.toFixed(1) : 0}</span>
        <Icon size={2.5}>star-filled</Icon>
      </div>
    </div>
  );
};

export default FeaturedBar;
