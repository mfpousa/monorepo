import React from "react";
import classNames from "classnames";

import "./FilterSelectorGroup.scss";

interface FilterSelectorGroupProps {
  children: React.ReactNode;
  type?: "row" | "grid";
}

const FilterSelectorGroup = ({
  children,
  type = "grid",
}: FilterSelectorGroupProps) => {
  return (
    <div className={classNames("filter-selector-group", type)}>{children}</div>
  );
};

export default FilterSelectorGroup;
