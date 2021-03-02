import React from "react";
import {
  Filters,
  InputSlider,
  FilterSelectorGroup,
  RegionFilterSection,
} from "components/atoms";
import { ResourceAndGenderSection, GameDateSection } from "./";
import { FilterContext } from "globals/FilterContext";
import { useHistory } from "react-router";

import "./FilterGames.scss";
import { useTranslation } from "react-i18next";

interface FilterGamesProps {
  isLoading?: boolean;
  filters?: Array<{
    query: string;
    value: string;
    type: string;
    description?: string;
  }>;
  setFilters?: React.Dispatch<
    React.SetStateAction<
      Array<{
        query: string;
        value: string;
        type: string;
        description?: string;
      }>
    >
  >;
  values?: Array<{
    query: string;
    value: string;
    type: string;
    description?: string;
  }>;
  setValues?: React.Dispatch<
    React.SetStateAction<
      Array<{
        query: string;
        value: string;
        type: string;
        description?: string;
      }>
    >
  >;
  handleClearBtn?: () => void;
}

const FilterGames = ({
  isLoading = false,
  filters,
  setFilters,
  values,
  setValues,
  handleClearBtn,
}: FilterGamesProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    dropdownOnChange,
    findValueByQueryName,
    inputOnChange,
    handleApplyBtn,
  } = React.useContext(FilterContext);

  return (
    <Filters
      handleApplyBtn={handleApplyBtn(values, setFilters, () =>
        history.replace("/games")
      )}
      handleClearBtn={handleClearBtn}
      disabled={isLoading}
      filters={filters}
    >
      <RegionFilterSection
        values={values}
        findValueByQueryName={findValueByQueryName(values)}
        dropdownOnChange={dropdownOnChange("games", setValues)}
      />

      <ResourceAndGenderSection
        findValueByQueryName={findValueByQueryName(values)}
        dropdownOnChange={dropdownOnChange("games", setValues)}
      />

      <GameDateSection
        inputOnChange={inputOnChange("games", setValues)}
        startDateValue={
          values.find((item) => item.query === "startDate")?.value || ""
        }
        endDateValue={
          values.find((item) => item.query === "endDate")?.value || ""
        }
      />

      <FilterSelectorGroup type="row">
        <InputSlider
          inputOnChange={inputOnChange("games", setValues)}
          inputMinLabel={t("atoms:gameMinLevelLabel")}
          inputMaxLabel={t("atoms:gameMaxLevelLabel")}
          inputMinName="gameMinLevel"
          inputMaxName="gameMaxLevel"
          minSelectedValue={
            values.find((item) => item.query === "gameMinLevel")?.value || "1"
          }
          maxSelectedValue={
            values.find((item) => item.query === "gameMaxLevel")?.value || "7"
          }
        />
      </FilterSelectorGroup>
    </Filters>
  );
};

export default FilterGames;
