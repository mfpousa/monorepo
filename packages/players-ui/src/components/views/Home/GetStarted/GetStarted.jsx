import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useViewportScroll, useTransform } from "framer-motion";

import { useViewport } from "hooks";

import "./GetStarted.scss";

const GetStarted = () => {
  const { t } = useTranslation();
  const [viewport] = useViewport();
  const { scrollYProgress } = useViewportScroll();

  const scaleMobile = useTransform(scrollYProgress, [0.0, 0.05], [1.5, 1]);
  const scaleTablet = useTransform(scrollYProgress, [0.02, 0.073], [1.5, 1.2]);
  const scaleDesktop = useTransform(scrollYProgress, [0.03, 0.09], [1.4, 1]);

  const transYMobile = useTransform(scrollYProgress, [0.0, 0.05], [-180, 0]);
  const transYTablet = useTransform(scrollYProgress, [0.02, 0.073], [-25, 0]);
  const transYDesktop = useTransform(scrollYProgress, [0.03, 0.09], [60, 0]);

  const transXMobile = useTransform(scrollYProgress, [0.0, 0.05], [100, 0]);

  return (
    <div className="GetStarted">
      <div className="wrapper">
        {viewport === "desktop" || viewport === "largeDesktop" ? (
          <motion.div
            style={{
              scale: scaleDesktop,
              translateY: transYDesktop,
            }}
            className="basketball-image"
          ></motion.div>
        ) : (
          <motion.div
            style={{
              scale: viewport === "phone" ? scaleMobile : scaleTablet,
              translateY: viewport === "phone" ? transYMobile : transYTablet,
              translateX: viewport === "phone" ? transXMobile : 0,
            }}
            className="basketball-image"
          ></motion.div>
        )}

        <div className="container">
          <div className="title">{t("home:getStarted")}</div>
          <div className="description">{t("home:findPeople")}</div>
          <Link to="/games" className="highlighted">
            {t("home:joinGame")}
          </Link>
          <Link to="/venues" className="highlighted">
            {t("home:bookVenue")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
