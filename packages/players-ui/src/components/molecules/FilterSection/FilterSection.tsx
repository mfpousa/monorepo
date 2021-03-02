import React from "react";
import { useHistory } from "react-router";

import { useViewport } from "hooks";
import { FilterSelectorSm, FilterSelectorLg } from "components/atoms";
import {
  FilterGames,
  FilterVenues,
  SelectedFilters,
} from "components/molecules";

import "./FilterSection.scss";

interface FilterSectionProps {
  children: React.ReactElement;
  withCreateGameBtn?: boolean;
  withAddToFavoriteIcon?: boolean;
  isLoading?: boolean;
  filters: Array<{
    query: string;
    value: string;
    type: string;
    description: string;
  }>;
  createBtnCallback?: () => void;
  setFilters: React.Dispatch<
    React.SetStateAction<
      Array<{
        query: string;
        value: string;
        type: string;
        description: string;
      }>
    >
  >;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  children,
  withCreateGameBtn = false,
  withAddToFavoriteIcon = false,
  isLoading = false,
  filters,
  createBtnCallback,
  setFilters,
}) => {
  const history = useHistory();
  const [viewport] = useViewport();
  const [values, setValues] = React.useState<
    Array<{
      query: string;
      value: string;
      type: string;
      description?: string;
    }>
  >([]);

  const onSearchFilter = (value: string) => {};

  const handleClearBtn = (
    clearSelectedFilters = false,
    redirectPath: string
  ) => () => {
    setValues([]);
    if (clearSelectedFilters) {
      setFilters([]);
      history.push(redirectPath);
      return;
    }
  };

  React.useEffect(() => {
    setValues(
      filters.map((item) => {
        return {
          ...item,
          value: item.query.startsWith("has") ? item.query : item.value,
        };
      })
    );
  }, [filters]);

  return (
    <>
      {viewport === "desktop" || viewport === "largeDesktop" ? (
        <FilterSelectorLg
          withCreateGameBtn={withCreateGameBtn}
          withAddToFavoriteIcon={withAddToFavoriteIcon}
          createBtnCallback={createBtnCallback}
          setFilters={setFilters}
        >
          {React.cloneElement(children, {
            filters,
            setFilters,
            values,
            setValues,
            isLoading,
            handleClearBtn,
          })}
        </FilterSelectorLg>
      ) : (
        <FilterSelectorSm
          withCreateGameBtn={withCreateGameBtn}
          setFilters={setFilters}
        >
          {React.cloneElement(children, {
            filters,
            setFilters,
            values,
            setValues,
            isLoading,
            handleClearBtn,
          })}
        </FilterSelectorSm>
      )}
      <SelectedFilters
        filters={filters}
        setFilters={setFilters}
        handleClearFilters={handleClearBtn(
          true,
          withCreateGameBtn ? "/games" : "/venues"
        )}
        withCreateGameBtn={withCreateGameBtn}
      />
    </>
  );
};

export default FilterSection;
