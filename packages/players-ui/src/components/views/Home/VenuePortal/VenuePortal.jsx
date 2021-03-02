import React from "react";
import { useTranslation } from "react-i18next";

import "./VenuePortal.scss";
import { Icon } from "components/atoms";
import { Link } from "react-router-dom";

const VenuePortal = () => {
  const { t } = useTranslation();
  return (
    <div className="VenuePortal">
      <div className="wrapper">
        <div className="image"></div>
        <div className="container">
          <div className="title">{t("home:areYouAVenue")}</div>
          <div className="description">{t("home:areYouAVenueDesc")}</div>
          <div className="features">
            <div className="feature">
              <div className="image">
                <Icon size={2.5}>ai</Icon>
              </div>
              <div className="title">{t("home:venueFeatureOne")}</div>
            </div>
            <div className="feature">
              <div className="image">
                <Icon size={2.5}>stats</Icon>
              </div>
              <div className="title">{t("home:venueFeatureTwo")}</div>
            </div>
            <div className="feature">
              <div className="image">
                <Icon size={2.5}>calendar</Icon>
              </div>
              <div className="title">{t("home:venueFeatureThree")}</div>
            </div>
          </div>
          <Link to="/venues" className="highlighted">
            {t("home:exploreVenuePortal")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VenuePortal;
