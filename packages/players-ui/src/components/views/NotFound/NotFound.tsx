import React from "react";
import { Icon } from "components/atoms";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./NotFound.scss";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="NotFound">
      <div className="container-404">
        <div className="number1">4</div>
        <div className="tennis-image"></div>
        <div className="number">4</div>
      </div>
      <div className="description">
        <div className="line-shadow"></div>
        <div className="title">Oops</div>
        <div className="text">{t("translation:oops")}</div>
      </div>

      <Link to="/" className="logo">
        <div>{t("header:iBook")}</div>
        <div>{t("header:wePlay")}</div>
      </Link>

      <div className="container">
        <div className="image">
          <Icon size={10}>players-boxing</Icon>
        </div>
        <div className="image">
          <Icon size={10}>players-baseball</Icon>
        </div>
        <div className="image">
          <Icon size={10}>players-basketball</Icon>
        </div>
        <div className="image">
          <Icon size={10}>players-football2</Icon>
        </div>
        <div className="image">
          <Icon size={10}>players-golf</Icon>
        </div>
        <div className="image">
          <Icon size={10}>players-handball</Icon>
        </div>
        <div className="image">
          <Icon size={10}>players-tennis</Icon>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
