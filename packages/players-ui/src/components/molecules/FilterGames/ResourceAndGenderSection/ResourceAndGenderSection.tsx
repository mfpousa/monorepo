import React from "react";
import { useTranslation } from "react-i18next";
import { FilterSelectorGroup, Dropdown } from "components/atoms";
import { resourceTypes, genderTypes } from "globals/enums";

import "./ResourceAndGenderSection.scss";

interface ResourceAndGenderSectionProps {
  findValueByQueryName: (query: string) => any;
  dropdownOnChange: (
    event: {
      name: string;
      value: string;
    },
    labelText?: string
  ) => void;
  onlyDropdown?: boolean;
}

const ResourceAndGenderSection = ({
  onlyDropdown = false,
  findValueByQueryName,
  dropdownOnChange,
}: ResourceAndGenderSectionProps) => {
  const { t } = useTranslation();

  const content = (
    <>
      <Dropdown
        label={t("atoms:resourceTypeLabel")}
        inputName="resourceType"
        color="dark"
        displayText="Select"
        options={resourceTypes?.map((value) => ({
          display: t(`resourceType:${value}`),
          value,
        }))}
        onChange={(
          event: { name: string; value: string },
          labelText?: string
        ) => dropdownOnChange(event, labelText)}
        selectedValue={findValueByQueryName("resourceType")}
      />
      <Dropdown
        label={t("atoms:genderTypeLabel")}
        inputName="genderType"
        color="dark"
        displayText="Select"
        options={genderTypes?.map((value) => ({
          display: t(`genderType:${value}`),
          value,
        }))}
        onChange={(
          event: { name: string; value: string },
          labelText?: string
        ) => dropdownOnChange(event, labelText)}
        selectedValue={findValueByQueryName("genderType")}
      />
    </>
  );

  if (onlyDropdown) {
    return content;
  }

  return <FilterSelectorGroup>{content}</FilterSelectorGroup>;
};

export default ResourceAndGenderSection;
