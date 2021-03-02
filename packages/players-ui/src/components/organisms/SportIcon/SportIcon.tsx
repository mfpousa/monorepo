import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import "./SportIcon.scss";
import { Icon } from "components/atoms";
import { Venue } from "api/venues";
import { Tip } from "globals/utils";

const GetElementWithIcon = (sport) => {
  const classes = classnames("icon", { sport });
  const infoText = sport.replace(/-/g, " ");
  const text = infoText.replace(/^\w/, (chr) => chr.toUpperCase());

  return (
    <Tip title={text}>
      <div className={classes}>
        <Icon>{sport}</Icon>
      </div>
    </Tip>
  );
};

type SportIconProps = {
  type: Venue;
  isInCard: boolean;
};

const SportIcon: React.FunctionComponent<SportIconProps> = ({
  type,
  isInCard,
}) => {
  const [list, setList] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const icons = [];

    if (type.hasBaseball) {
      icons.push(GetElementWithIcon("baseball"));
    }
    if (type.hasBasketball) {
      icons.push(GetElementWithIcon("basketball"));
    }
    if (type.hasBoxing) {
      icons.push(GetElementWithIcon("boxing"));
    }
    if (type.hasCricket) {
      icons.push(GetElementWithIcon("cricket"));
    }
    if (type.hasIceHockey) {
      icons.push(GetElementWithIcon("ice-hockey"));
    }
    if (type.hasRugby) {
      icons.push(GetElementWithIcon("rugby"));
    }
    if (type.hasTableTennis) {
      icons.push(GetElementWithIcon("table-tennis"));
    }
    if (type.hasTennis) {
      icons.push(GetElementWithIcon("tennis"));
    }
    if (type.hasBadminton) {
      icons.push(GetElementWithIcon("badminton"));
    }
    if (type.hasSquash) {
      icons.push(GetElementWithIcon("squash"));
    }
    if (type.hasNetball) {
      icons.push(GetElementWithIcon("netball"));
    }
    if (type.hasGolf) {
      icons.push(GetElementWithIcon("golf"));
    }
    if (type.hasFootball) {
      icons.push(GetElementWithIcon("football"));
    }
    if (type.hasPadel) {
      icons.push(GetElementWithIcon("padel"));
    }
    if (type.hasAmericanFotball) {
      icons.push(GetElementWithIcon("american-fotball"));
    }
    if (type.hasFutsal) {
      icons.push(GetElementWithIcon("futsal"));
    }
    if (type.hasHandBall) {
      icons.push(GetElementWithIcon("handball"));
    }
    if (type.hasVollyball) {
      icons.push(GetElementWithIcon("vollyball"));
    }
    if (type.hasFieldHockey) {
      icons.push(GetElementWithIcon("field-hockey"));
    }
    setList(icons);
  }, [type]);

  let listLength = list.length - 3;

  return (
    <div className="SportIcon">
      {isInCard
        ? list.map((item, index) => {
            if (index < 3) {
              return (
                // TODO: Create our own useTranslation() hook that returns always a String
                <React.Fragment key={t(`reference:${index}`).toString()}>
                  {item}
                </React.Fragment>
              );
            }
          })
        : list.map((item, index) => {
            return (
              // TODO: Create our own useTranslation() hook that returns always a String
              <React.Fragment key={t(`reference:${index}`).toString()}>
                {item}
              </React.Fragment>
            );
          })}
      <div className="remaining-sports">
        <span>{`${listLength <= 0 ? "" : "+" + listLength}`}</span>
      </div>
    </div>
  );
};

export default SportIcon;
