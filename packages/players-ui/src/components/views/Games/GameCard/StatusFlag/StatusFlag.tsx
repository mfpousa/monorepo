import React from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import "./StatusFlag.scss";

interface StatusFlagProps {
  days: number;
  status: string;
}

const StatusFlag = ({ days, status }: StatusFlagProps) => {
  const { t } = useTranslation();
  const classes = classnames("status", {
    distant: status === "distant",
    close: status === "close",
    nearby: status === "nearby",
  });

  const title =
    days <= 0
      ? `${t("games:daysTextToday")}`
      : days > 1
      ? `${t("games:daysIn")} ${days} ${t("games:daysTextPlural")}`
      : `${t("games:daysIn")} ${days} ${t("games:daysTextSingular")}`;

  return (
    <div className="InfoFlag">
      <span className={classes}></span>
      <p>{title}</p>
    </div>
  );
};

export default StatusFlag;
