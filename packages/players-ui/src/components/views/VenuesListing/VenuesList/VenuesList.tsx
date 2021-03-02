import React from "react";
import { useTranslation } from "react-i18next";
import { PlaceHolderVenuesListing, EmptyState } from "components/atoms";
import { VenueCard } from "components/organisms";
import { Venue } from "api/venues/Venue";

import "./VenuesList.scss";
interface VenuesListProps {
  onOpenDetail;
  venues: Array<Venue>;
  isLoading: boolean;
  filters: Array<{
    query: string;
    value: string;
    type: string;
    description: string;
  }>;
  page: number;
}

const VenuesList: React.FC<VenuesListProps> = ({
  onOpenDetail,
  venues,
  isLoading,
  filters,
  page,
}) => {
  const { t } = useTranslation();

  const venuesList = venues.map((v, index) => (
    <VenueCard
      key={index}
      venueUuid={v.establishmentUuid}
      onlineBookingEnabled={v.onlineBookingEnabled}
      type={v}
      name={v.name}
      description={[v.cityDescription, v.postalCode]
        .map((s) => s?.trim())
        .filter(Boolean)
        .join(", ")}
      rating={v.averageRating}
      featured={v.sortOrder > 0}
      onClick={() => onOpenDetail(v)}
      index={index}
    />
  ));

  if (isLoading && page === 0) {
    return (
      <div className="venues-list">
        <PlaceHolderVenuesListing />
      </div>
    );
  }

  if (
    !isLoading &&
    filters.some((item) => item.value !== "") &&
    venues.length <= 0
  ) {
    return <EmptyState title={t("atoms:noItems")} />;
  }

  return (
    <>
      <div className="venues-list">
        {venuesList}
        {isLoading && <PlaceHolderVenuesListing />}
      </div>
    </>
  );
};

export default VenuesList;
