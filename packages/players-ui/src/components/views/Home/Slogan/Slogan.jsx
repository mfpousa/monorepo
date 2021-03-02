import React from "react";
import { useTranslation } from "react-i18next";

import "./Slogan.scss";

const Slogan = () => {
  const { t } = useTranslation();
  return (
    <div className="Slogan">
      <div className="wrapper">
        <div className="text">
          <div>{t("home:yourSport")}</div>
          <div>{t("home:yourWay")}</div>
        </div>
        <div className="tennis-ball-image"></div>
      </div>
    </div>
  );
};

export default Slogan;
