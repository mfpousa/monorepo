import React from "react";
import { useTranslation } from "react-i18next";

import "./WhyUs.scss";
import { Icon } from "components/atoms";

const WhyUs = () => {
  const { t } = useTranslation();
  return (
    <div className="WhyUs">
      <div className="wrapper">
        <div className="reasons">
          <div className="reason">
            <div className="icon">
              <Icon size={6}>ai</Icon>
            </div>
            <div className="description">
              <div className="title">{t("home:smartRecommendations")}</div>
              <div className="text">{t("home:smartRecommendationsDesc")}</div>
            </div>
          </div>
          <div className="reason">
            <div className="description">
              <div className="title">{t("home:smartSportAssistant")}</div>
              <div className="text">{t("home:smartSportAssistantDesc")}</div>
            </div>
            <div className="icon">
              <Icon size={6}>distance</Icon>
            </div>
          </div>
          <div className="reason">
            <div className="icon">
              <Icon size={6}>calendar</Icon>
            </div>
            <div className="description">
              <div className="title">{t("home:smartGames")}</div>
              <div className="text">{t("home:smartGamesDesc")}</div>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="pre-title">{t("home:why")}</div>
          <div className="title">
            <div>{t("commons:iBook")}</div>
            <div>{t("commons:wePlay")}</div>
          </div>
        </div>
      </div>
      <div className="dust-image"></div>
    </div>
  );
};

export default WhyUs;
