import React from "react";
import { useTranslation } from "react-i18next";
import {
  Country,
  useCitiesByProvince,
  useCountries,
  useProvincesByCountry,
} from "api/references";
import { FilterSelectorGroup } from "components/atoms/FilterSelectorGroup";
import { Dropdown } from "components/atoms";

interface RegionSectionProps {
  values: Array<{
    query: string;
    value: string;
    type: string;
  }>;
  findValueByQueryName: (query: string) => any;
  dropdownOnChange: (
    event: { name: string; value: string },
    labelText?: string
  ) => void;
  onlyDropdown?: boolean;
}

const RegionSection = ({
  values,
  findValueByQueryName,
  dropdownOnChange,
  onlyDropdown = false,
}: RegionSectionProps) => {
  const { t } = useTranslation();
  const { countries, isLoading: isCountriesLoading } = useCountries({});
  const { provinces, isLoading: isProvincesLoading } = useProvincesByCountry({
    countryUuid:
      values?.find((item) => item.query === "countryUuid")?.value || "",
  });
  const { cities, isLoading: isCitiesLoading } = useCitiesByProvince({
    provinceUuid:
      values?.find((item) => item.query === "provinceUuid")?.value || "",
  });

  console.log({ countries, provinces, cities });

  const content = (
    <>
      <Dropdown
        label={t("atoms:countryLabel")}
        inputName="countryUuid"
        color="dark"
        displayText="Select"
        disabled={isCountriesLoading}
        options={
          !isCountriesLoading &&
          ((countries || []) as Array<Country>).map((item) => ({
            display: item.description,
            value: item.countryUuid,
          }))
        }
        onChange={(
          event: { name: string; value: string },
          labelText?: string
        ) => dropdownOnChange(event, labelText)}
        selectedValue={findValueByQueryName("countryUuid")}
      />
      <Dropdown
        label={t("atoms:provinceLabel")}
        inputName="provinceUuid"
        color="dark"
        displayText="Select"
        disabled={isProvincesLoading}
        options={
          !isProvincesLoading &&
          provinces?.map((item) => ({
            display: item.description,
            value: item.provinceUuid,
          }))
        }
        onChange={(
          event: { name: string; value: string },
          labelText?: string
        ) => dropdownOnChange(event, labelText)}
        selectedValue={findValueByQueryName("provinceUuid")}
      />
      <Dropdown
        label={t("atoms:cityLabel")}
        inputName="cityUuid"
        color="dark"
        displayText="Select"
        disabled={isCitiesLoading}
        options={
          !isCitiesLoading &&
          cities?.map((item) => ({
            display: item.description,
            value: item.cityUuid,
          }))
        }
        onChange={(
          event: { name: string; value: string },
          labelText?: string
        ) => dropdownOnChange(event, labelText)}
        selectedValue={findValueByQueryName("cityUuid")}
      />
    </>
  );

  if (onlyDropdown) {
    return content;
  }

  return <FilterSelectorGroup>{content}</FilterSelectorGroup>;
};

export default RegionSection;
