import React from "react";
import { useTranslation } from "react-i18next";

import { SortDropdown, Icon, TextField } from "components/atoms";

import "./FilterSelectorSm.scss";

interface FilterSelectorSmProps {
  children: React.ReactChild;
  withCreateGameBtn: boolean;
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

const FilterSelectorSm = ({
  children,
  withCreateGameBtn,
  setFilters,
}: FilterSelectorSmProps) => {
  const { t } = useTranslation();

  return (
    <div className="FilterSelectorSm">
      <div className="filers-and-switch">
        <SortDropdown label="" icon={<Icon size={2}>sort</Icon>} />
        <div className="display-mode-switch">
          <button onClick={() => {}} className="switch-btn">
            <Icon size={2}>map</Icon>
          </button>
          <button onClick={() => {}} className="switch-btn selected">
            <Icon size={2}>grid</Icon>
          </button>
        </div>
        {children}
      </div>
      <TextField
        placeholder={
          withCreateGameBtn
            ? t("games:textFieldPlaceholder")
            : t("venues:textFieldPlaceholder")
        }
        icon={<Icon size={2}>search</Icon>}
        setFilters={setFilters}
      />
    </div>
  );
};

export default FilterSelectorSm;
