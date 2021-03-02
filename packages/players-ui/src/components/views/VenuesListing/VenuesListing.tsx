import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { InfiniteScroll } from "components/atoms";
import {
  Header,
  Footer,
  Heading,
  FilterVenues,
  VenueDetailsModal,
} from "components/molecules";
import { FilterSection } from "components/molecules/FilterSection";
import { VenuesList } from "./VenuesList";
import { useVenues } from "api/venues";
import { FilterContext } from "globals/FilterContext";
import { facilitiesWithHas, resourceTypesWithHas } from "globals/enums";

import "./VenuesListing.scss";

const Venues = ({ history, location }) => {
  const { t } = useTranslation();
  const { queryStrings, setQueryStrings } = React.useContext(FilterContext);
  const { venues, isLoading, nextPage, last, number } = useVenues({
    queryStrings,
  });
  const [filters, setFilters] = React.useState<
    Array<{
      query: string;
      value: string;
      type: string;
      description: string;
    }>
  >([]);
  const [open, setOpen] = useState(false);
  const [venueDetail, setVenueDetail] = useState(true);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpenDetail = useCallback((venue) => {
    setVenueDetail(venue);
    setOpen(true);
  }, []);

  const calculateQueryStrings = (redirectPath: string, type: string) => {
    if (!history) return;

    if (filters.length > 0) {
      const query = {};
      filters.forEach((item) => {
        if (item.value !== "") {
          query[item.query] = item.value;
        }
      });
      setQueryStrings(query);
      history.replace({
        pathname: redirectPath,
        search: `?${new URLSearchParams(query).toString()}`,
      });
      return;
    }

    const params = new URLSearchParams(location.search);
    if (params?.toString()?.length > 0) {
      const temp = {};
      const filterTemp = [];
      for (let q of params) {
        if (q[1] !== "") {
          temp[q[0]] = q[1];
          filterTemp.push({
            query: q[0],
            value: q[1],
            type: resourceTypesWithHas.some((item) => item === q[0])
              ? `${type}-checkbox-resource`
              : facilitiesWithHas.some((item) => item === q[0])
              ? `${type}-checkbox-facilities`
              : type,
          });
        }
      }
      setQueryStrings(temp);
      setFilters(filterTemp);
      history.replace({
        pathname: redirectPath,
        search: `?${params.toString()}`,
      });
      return;
    }
    setQueryStrings({});
    history.push(redirectPath);
  };

  React.useEffect(() => {
    calculateQueryStrings("/venues", "venues");
  }, [filters]);

  return (
    <div className="VenuesListing">
      <Header gray withSeparator />
      <div className="wrapper">
        <Heading
          title={t("venues:title")}
          description={t("venues:description")}
        />
        <FilterSection
          withAddToFavoriteIcon
          filters={filters}
          setFilters={setFilters}
          isLoading={isLoading}
        >
          <FilterVenues />
        </FilterSection>
        <VenuesList
          onOpenDetail={handleOpenDetail}
          venues={venues}
          isLoading={isLoading}
          filters={filters}
          page={number}
        />
        {!last && <InfiniteScroll callback={nextPage} />}
      </div>
      <Footer />
      <VenueDetailsModal
        open={open}
        onClose={handleClose}
        venue={venueDetail}
      />
    </div>
  );
};

export default Venues;
