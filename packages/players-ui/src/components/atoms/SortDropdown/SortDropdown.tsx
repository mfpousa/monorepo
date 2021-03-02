import React from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";

import "./SortDropdown.scss";

interface SortDropdownProps {
  label: string;
  options?: Array<any>;
  icon: React.ReactNode;
  className?: string;
}

const SortDropdown = ({
  label = "",
  options,
  icon,
  className,
  ...otherProps
}: SortDropdownProps) => {
  const { t } = useTranslation();

  return (
    <div {...otherProps} className={classnames("SortDropdown", className)}>
      {label && <div className="label">{label}</div>}
      <div className="selection">{t("atoms:distance")}</div>
      {icon && <div className="icon">{icon}</div>}
    </div>
  );
};

export default SortDropdown;
