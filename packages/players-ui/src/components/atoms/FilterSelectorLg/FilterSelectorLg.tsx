import React from "react";
import { useTranslation } from "react-i18next";

import { Icon, TextField, SortDropdown } from "components/atoms";

import "./FilterSelectorLg.scss";

interface FilterSelectorLgProps {
  children: React.ReactChild;
  withCreateGameBtn?: boolean;
  withAddToFavoriteIcon?: boolean;
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

const FilterSelectorLg: React.FC<FilterSelectorLgProps> = ({
  withCreateGameBtn,
  children,
  withAddToFavoriteIcon,
  createBtnCallback,
  setFilters,
}) => {
  const { t } = useTranslation();

  return (
    <div className="FilterSectionLg">
      <div className="block first">
        {withCreateGameBtn && (
          <button
            type="button"
            className="create-game-btn"
            onClick={createBtnCallback}
          >
            {t("games:createGameBtn")}
          </button>
        )}
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
      <div className="block second">
        {withAddToFavoriteIcon && (
          <div
            className="favorites-toggle tooltip tip-top"
            data-info={t("venues:addedToFavorite")}
          >
            <Icon size={2}>added-to-favourite</Icon>
          </div>
        )}
        <SortDropdown
          label={t("games:sortDropdown")}
          icon={<Icon size={2}>sort</Icon>}
        />
      </div>
      <div className="block third">
        <ul className="display-mode-switch">
          <li>
            <Icon size={2}>map</Icon>
          </li>
          <li className="selected">
            <Icon size={2}>grid</Icon>
          </li>
        </ul>

        {children}
      </div>
    </div>
  );
};

export default FilterSelectorLg;
