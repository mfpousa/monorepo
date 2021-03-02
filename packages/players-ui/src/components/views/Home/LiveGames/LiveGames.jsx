import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";

import { useViewport } from "hooks";
import { Icon } from "components/atoms";

import "./LiveGames.scss";

const LiveGames = () => {
  const { t } = useTranslation();
  const [viewport] = useViewport();
  const { scrollYProgress } = useViewportScroll();

  const scaleMobile = useTransform(scrollYProgress, [0.08, 0.13], [1.7, 1.4]);
  const scaleTablet = useTransform(scrollYProgress, [0.13, 0.17], [1.6, 1.25]);
  const scaleDesktop = useTransform(scrollYProgress, [0.17, 0.23], [1.5, 1]);

  const transYMobile = useTransform(scrollYProgress, [0.08, 0.13], [-5, 0]);
  const transYTablet = useTransform(scrollYProgress, [0.13, 0.17], [40, 0]);
  const transYDesktop = useTransform(scrollYProgress, [0.17, 0.23], [0, 0]);

  return (
    <div className="LiveGames">
      <div className="wrapper">
        <div className="container">
          <div className="description">
            <div className="title">{t("home:whichOne")}</div>
            <div className="text">{t("home:playAnySports")}</div>
          </div>
          <ul className="sports">
            <li className="tennis">
              <div className="image">
                <Icon size={4}>players-tennis</Icon>
              </div>
              <div className="text">{t("reference:tennis")}</div>
            </li>
            <li className="football">
              <div className="image">
                <Icon size={4}>players-football</Icon>
              </div>
              <div className="text">{t("reference:football")}</div>
            </li>
            <li className="volleyball">
              <div className="image">
                <Icon size={4}>players-volleyball</Icon>
              </div>
              <div className="text">{t("reference:volleyball")}</div>
            </li>
            <li className="basketball">
              <div className="image">
                <Icon size={4}>players-basketball</Icon>
              </div>
              <div className="text">{t("reference:basketball")}</div>
            </li>
          </ul>
          <div className="games">
            <div className="more">
              <div className="before">{t("home:and")}</div>
              <div className="text">{t("home:numberOfSports")}</div>
              <div className="after">{t("home:more")}</div>
            </div>
            <Link to="/games" className="highlighted">
              {t("home:checkGamesNear")}
            </Link>
          </div>
        </div>
        {viewport === "desktop" || viewport === "largeDesktop" ? (
          <motion.div
            style={{ scale: scaleDesktop, translateY: transYDesktop }}
            className="sports-image"
          ></motion.div>
        ) : (
          <motion.div
            style={{
              scale: viewport === "phone" ? scaleMobile : scaleTablet,
              translateY: viewport === "phone" ? transYMobile : transYTablet,
            }}
            className="sports-image"
          ></motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveGames;
