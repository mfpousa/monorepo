import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "components/atoms";

import "./CardTime.scss";

interface CardTimeProps {
  date: string;
  time: string;
  minLevel: number;
  maxLevel: number;
  distance: number;
}

const CardTime = ({
  date,
  time,
  minLevel,
  maxLevel,
  distance,
}: CardTimeProps) => {
  const { t } = useTranslation();

  return (
    <div className="CardTime">
      <div className="info">
        <div className="info-item">
          <div className="info-icon">
            <Icon size={2}>calendar</Icon>
          </div>
          <p className="info-text">{date}</p>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <Icon size={2}>time</Icon>
          </div>
          <p className="info-text">{time}</p>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <Icon size={2}>level</Icon>
          </div>
          <p className="info-text">{t('games:levels')} {`${minLevel}/${maxLevel}`}</p>
          <div className="distance">
            <Icon size={2}>distance</Icon>
            <p>{distance} Miles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTime;
