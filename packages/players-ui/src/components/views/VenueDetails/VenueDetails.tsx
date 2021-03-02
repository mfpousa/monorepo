import React from "react";
import { Heading } from "./Heading";
import { LocationAndFacilities } from "./LocationAndFacilities";
import { ResourceTypeList } from "./ResourceTypeList";
import { ReviewCardList } from "./ReviewCardList";

import { Venue } from "api/venues";

import "./VenueDetails.scss";

const courtsData = {
  tennis: [
    {
      surfaceType: "clay",
      locationType: "indoor",
      description: "Description about our tennis courts. Showing two lines.",
      count: 1,
    },
    {
      surfaceType: "grass",
      locationType: "outdoor",
      description: "Description about our tennis courts. Showing two lines.",
      count: 2,
    },
    {
      surfaceType: "hard",
      locationType: "indoor",
      description: "Description about our tennis courts. Showing two lines.",
      count: 1,
    },
  ],
  tableTennis: [
    {
      surfaceType: "wood",
      locationType: "indoor",
      description: "Description about our tennis courts. Showing two lines.",
      count: 2,
    },
  ],
};

const VenueDetails = ({ venue }: { venue: Venue }) => {
  return (
    <div className="VenueDetails">
      <Heading venue={venue} />
      <LocationAndFacilities {...venue} />
      <ResourceTypeList courts={courtsData} />
      <ReviewCardList
        establishmentUuid={venue.establishmentUuid}
        totalReviews={venue.totalReviews}
      />
    </div>
  );
};

export default VenueDetails;
