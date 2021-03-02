import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "components/atoms/Icon";

import "./CardHeading.scss";

interface CardHeadingProps {
  title: string;
  resourceType: string;
  personsQty: string;
  distance: string;
}

const CardHeading = ({
  title,
  resourceType = "",
  personsQty,
  distance,
}: CardHeadingProps) => {
  const { t } = useTranslation();
  const iconPath: string = `players-${resourceType
    .replace("_", "")
    .toLowerCase()}`;

  return (
    <div className="CardHeader">
      <div className="icon">
        <Icon size={10}>{iconPath}</Icon>
      </div>
      <div className="info">
        <h3 className="title">{t(`resourceType:${title}`)} </h3>
        <div className="bottomInfo">
          <div className="maxPersons">
            <p className="number">X{personsQty}</p>
            <div className="personIcon">
              <Icon size={3}>man</Icon>
            </div>
          </div>

          <div className="distance">
            <div className="distanceIcon">
              <Icon size={2}>distance</Icon>
            </div>
            <p>{distance} Miles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeading;
