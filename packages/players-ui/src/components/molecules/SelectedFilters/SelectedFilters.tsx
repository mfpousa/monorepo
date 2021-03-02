import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "components/atoms";
import { calculateStartDateInGames } from "globals/utils";
import { FilterContext } from "globals/FilterContext";
import { Country, useCity, useCountries, useProvince } from "api/references";
import {
  facilitiesHasTransform,
  facilitiesWithHas,
  resourceTypeHasTransform,
  resourceTypesWithHas,
} from "globals/enums";

import "./SelectedFilters.scss";

interface PillProps {
  withTranslation: boolean;
  query: string;
  value: string;
  description: string;
  idx: number;
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

const Pill = ({
  withTranslation,
  query,
  value,
  description,
  setFilters,
}: PillProps) => {
  const { t } = useTranslation();
  const { countries: country, isLoading: isCountryLoading } = useCountries({
    countryUuid: value !== "true" ? value : "",
    disabled: query !== "countryUuid",
  });
  const { province, isLoading: isProvinceLoading } = useProvince({
    provinceUuid: value !== "true" ? value : "",
    disabled: query !== "provinceUuid",
  });
  const { city, isLoading: isCityLoading } = useCity({
    cityUuid: value !== "true" ? value : "",
    disabled: query !== "cityUuid",
  });
  const [title, setTitle] = React.useState("");

  const handleDeletePill = () => {
    setFilters((prev) => {
      return prev.filter((item) => item.query !== query);
    });
  };

  React.useEffect(() => {
    if (withTranslation) {
      switch (query) {
        case "resourceType":
          setFilters((prev) => [
            ...findAndSetDescription(
              prev,
              "resourceType",
              t(`${query}:${value}`)
            ),
          ]);
          setTitle(t(`${query}:${value}`));
          break;

        case "genderType":
          setFilters((prev) => [
            ...findAndSetDescription(
              prev,
              "genderType",
              t(`${query}:${value}`)
            ),
          ]);
          setTitle(t(`${query}:${value}`));
          break;

        case "gameMinLevel":
          setFilters((prev) => [
            ...findAndSetDescription(prev, "gameMinLevel", t(`atoms:${query}`)),
          ]);
          setTitle(`${t(`atoms:${query}`)} ${value}`);
          break;

        case "gameMaxLevel":
          setFilters((prev) => [
            ...findAndSetDescription(prev, "gameMaxLevel", t(`atoms:${query}`)),
          ]);
          setTitle(`${t(`atoms:${query}`)} ${value}`);
          break;

        case "startDate":
          setFilters((prev) => [
            ...findAndSetDescription(prev, "startDate", t(`atoms:${query}`)),
          ]);
          setTitle(
            `${t(`atoms:${query}`)} ${calculateStartDateInGames(value)}`
          );
          break;

        case "endDate":
          setFilters((prev) => [
            ...findAndSetDescription(prev, "endDate", t(`atoms:${query}`)),
          ]);
          setTitle(
            `${t(`atoms:${query}`)} ${calculateStartDateInGames(value)}`
          );
          break;

        case "establishmentType":
          setFilters((prev) => [
            ...findAndSetDescription(
              prev,
              "establishmentType",
              t(`establishmentType:${value}`)
            ),
          ]);
          setTitle(t(`establishmentType:${value}`));
          break;
      }

      return;
    }

    if (resourceTypesWithHas.some((item) => item === query)) {
      setTitle(t(`resourceType:${resourceTypeHasTransform[query]}`));
      return;
    }

    if (facilitiesWithHas.some((item) => item === query)) {
      setTitle(t(`facilities:${facilitiesHasTransform[query]}`));
      return;
    }

    if (query === "name") {
      setFilters((prev) => [
        ...findAndSetDescription(prev, "name", t("atoms:searchPill")),
      ]);
      setTitle(t("atoms:searchPill"));
      return;
    }

    if (
      query === "countryUuid" &&
      value !== "true" &&
      !description &&
      !isCountryLoading
    ) {
      setFilters((prev) => [
        ...findAndSetDescription(
          prev,
          "countryUuid",
          (country as Country).description
        ),
      ]);
      setTitle((country as Country).description);
      return;
    }

    if (
      query === "provinceUuid" &&
      value !== "true" &&
      !description &&
      !isProvinceLoading
    ) {
      setFilters((prev) => [
        ...findAndSetDescription(prev, "provinceUuid", province.description),
      ]);
      setTitle(province.description);
      return;
    }

    if (
      query === "cityUuid" &&
      value !== "true" &&
      !description &&
      !isCityLoading
    ) {
      setFilters((prev) => [
        ...findAndSetDescription(prev, "cityUuid", city.description),
      ]);
      setTitle(city.description);
      return;
    }

    setTitle(description);
  }, [
    value,
    withTranslation,
    isCountryLoading,
    isProvinceLoading,
    isCityLoading,
  ]);

  const findAndSetDescription = (
    arr: Array<any>,
    query: string,
    description: string
  ): Array<any> => {
    return arr.map((item) => {
      let tempItem = item;
      if (item.query === query) {
        tempItem = {
          ...item,
          description: description,
        };
      }

      return tempItem;
    });
  };

  return (
    <div className="pill-container">
      <p className="pill-text">{title?.toLowerCase()}</p>
      <button className="pill-delete-btn" onClick={handleDeletePill}>
        <Icon size={2}>close</Icon>
      </button>
    </div>
  );
};

interface SelectedFiltersProps {
  withCreateGameBtn: boolean;
  filters?: Array<{
    query: string;
    value: string;
    type: string;
    description: string;
  }>;
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
  handleClearFilters: () => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  withCreateGameBtn = false,
  filters,
  setFilters,
  handleClearFilters,
}) => {
  const { t } = useTranslation();

  return (
    <div className="SelectedFilters">
      {filters
        .filter((item) => item.value !== "")
        .map((item, index) => (
          <Pill
            withTranslation={
              item.query === "resourceType" ||
              item.query === "genderType" ||
              item.query === "establishmentType" ||
              item.query === "facilities" ||
              item.query === "gameMinLevel" ||
              item.query === "gameMaxLevel" ||
              item.query === "startDate" ||
              item.query === "endDate"
            }
            setFilters={setFilters}
            query={item.query}
            value={item.value}
            description={item.description}
            idx={index}
            key={item.query}
          />
        ))}
      {filters.filter((item) => item.value !== "").length > 0 && (
        <button onClick={handleClearFilters} className="clear-filters-btn">
          {t("games:clearFiltersBtn")}
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;
