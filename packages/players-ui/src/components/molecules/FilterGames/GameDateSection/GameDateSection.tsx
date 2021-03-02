import React from "react";
import { FilterSelectorGroup, FilterInputGroup } from "components/atoms";

import "./GameDateSection.scss";
import { useTranslation } from "react-i18next";

interface GameDateSectionProps {
  inputOnChange: (
    descriptionText: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  startDateValue: string;
  endDateValue: string;
  onlyInputs?: boolean;
}

const GameDateSection = ({
  inputOnChange,
  startDateValue,
  endDateValue,
  onlyInputs,
}: GameDateSectionProps) => {
  const { t } = useTranslation();

  const content = (
    <>
      <FilterInputGroup
        inputType="date"
        inputLabel={t("atoms:startDateLabel")}
        inputName="startDate"
        inputId="startDate"
        inputPlaceholder="Select"
        onChange={inputOnChange("Start at")}
        value={startDateValue.split("T")[0]}
      />
      <FilterInputGroup
        inputType="date"
        inputLabel={t("atoms:endDateLabel")}
        inputName="endDate"
        inputId="endDate"
        inputPlaceholder="Select"
        onChange={inputOnChange("End at")}
        value={endDateValue.split("T")[0]}
      />
    </>
  );

  if (onlyInputs) {
    return content;
  }

  return <FilterSelectorGroup>{content}</FilterSelectorGroup>;
};

export default GameDateSection;
