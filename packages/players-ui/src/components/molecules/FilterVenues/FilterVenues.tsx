import React from "react";
import { useTranslation } from "react-i18next";

import {
  Filters,
  FilterSelectorGroup,
  Dropdown,
  DropdownCheckboxes,
  RegionFilterSection,
} from "components/atoms";
import { resourceTypes, facilities, establishmentType } from "globals/enums";

import "./FilterVenues.scss";
import { FilterContext } from "globals/FilterContext";
import { useHistory } from "react-router";

interface FilterVenuesProps {
  isLoading?: boolean;
  filters?: Array<{
    query: string;
    value: string;
    type: string;
    description: string;
  }>;
  setFilters?: React.Dispatch<
    React.SetStateAction<
      Array<{
        query: string;
        value: string;
        type: string;
        description: string;
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

const FilterVenues = ({
  isLoading,
  filters,
  setFilters,
  values,
  setValues,
  handleClearBtn,
}: FilterVenuesProps) => {
  const history = useHistory();
  const { t } = useTranslation();
  const {
    dropdownOnChange,
    findValueByQueryName,
    dropdownCheckboxesChange,
    handleApplyBtn,
    transformHasString,
  } = React.useContext(FilterContext);

  return (
    <Filters
      handleApplyBtn={handleApplyBtn(values, setFilters, () =>
        history.replace("/venues")
      )}
      handleClearBtn={handleClearBtn}
      disabled={isLoading}
      filters={filters}
    >
      <RegionFilterSection
        values={values}
        findValueByQueryName={findValueByQueryName(values)}
        dropdownOnChange={dropdownOnChange("venues", setValues)}
      />
      <FilterSelectorGroup>
        <DropdownCheckboxes
          label="Resource Type"
          color="dark"
          displayText="Select"
          options={[
            ...resourceTypes?.map((value) => ({
              display: t(`resourceType:${value}`),
              value: transformHasString(value, value.length),
            })),
          ]}
          settingUpFilters={dropdownCheckboxesChange(
            "venues-checkbox-resource",
            setValues
          )}
          selectedValues={values
            .filter(({ type }) => type === "venues-checkbox-resource")
            .map((item) => {
              return {
                labelText: t(`resourceType:${item.description?.toUpperCase()}`),
                value: item.query,
              };
            })}
        />
        <Dropdown
          label="Establishment Type"
          inputName="establishmentType"
          color="dark"
          displayText="Select"
          options={establishmentType?.map((value) => ({
            display: t(`establishmentType:${value}`),
            value,
          }))}
          onChange={(
            event: { name: string; value: string },
            labelText?: string
          ) => dropdownOnChange("venues", setValues)(event, labelText)}
          selectedValue={findValueByQueryName(values)("establishmentType")}
        />
        <DropdownCheckboxes
          label="Facilities"
          color="dark"
          displayText="Select"
          options={[
            ...facilities?.map((value) => ({
              display: t(`facilities:${value}`),
              value: transformHasString(value, value.length),
            })),
          ]}
          settingUpFilters={dropdownCheckboxesChange(
            "venues-checkbox-facilities",
            setValues
          )}
          selectedValues={values
            .filter(({ type }) => type === "venues-checkbox-facilities")
            .map((item) => {
              return {
                labelText: t(`facilities:${item.description?.toUpperCase()}`),
                value: item.query,
              };
            })}
        />
      </FilterSelectorGroup>
    </Filters>
  );
};

export default FilterVenues;
