import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";

import { useViewport } from "hooks";
import { PlaceHolderVenues } from "components/atoms";
import { Slider } from "components/molecules";
import { FeaturedCard } from "components/organisms";

import { useFeaturedVenues } from "api/venues";
import "./Venues.scss";

const Venues = () => {
  const { t } = useTranslation();
  const { venues } = useFeaturedVenues();
  const [viewport] = useViewport();
  const { scrollYProgress } = useViewportScroll();

  const scaleMobile = useTransform(scrollYProgress, [0.29, 0.34], [1.7, 1.5]);
  const scaleTablet = useTransform(scrollYProgress, [0.32, 0.36], [1.7, 1.4]);
  const scaleDesktop = useTransform(scrollYProgress, [0.28, 0.37], [1.6, 1]);

  const transYMobile = useTransform(scrollYProgress, [0.29, 0.34], [-50, 10]);
  const transYTablet = useTransform(scrollYProgress, [0.32, 0.36], [-40, 10]);
  const transYDesktop = useTransform(scrollYProgress, [0.33, 0.42], [-40, 0]);

  const placeholders =
    viewport === "largeDesktop" ? <PlaceHolderVenues /> : null;

  return (
    <div className="Venues">
      <div className="wrapper">
        <div className="header">
          <div className="header-image">
            {viewport === "desktop" || viewport === "largeDesktop" ? (
              <motion.div
                className="venues-particles"
                style={{ scale: scaleDesktop, translateY: transYDesktop }}
              ></motion.div>
            ) : (
              <motion.div
                className="venues-particles"
                style={{
                  scale: viewport === "phone" ? scaleMobile : scaleTablet,
                  translateY:
                    viewport === "phone" ? transYMobile : transYTablet,
                }}
              ></motion.div>
            )}
            <div className="venues-image" style={{ scale: scaleMobile }}></div>
          </div>
          <div className="description">
            <div className="title">{t("home:venuesDirectory")}</div>
            <div className="text">{t("home:venuesDescription")}</div>
          </div>
        </div>
        <div className="featured">
          <div className="title">{t("home:featureVenues")}</div>
          {venues.length > 0 ? (
            viewport === "largeDesktop" ? (
              <div className="venues">
                {venues?.map((v) => (
                  <FeaturedCard
                    key={v.establishmentUuid}
                    cardAnimation={true}
                    slim
                    type={v}
                    name={v.name}
                    description={[v.cityDescription, v.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                    rating={v.averageRating}
                    onlineBookingEnabled={v.onlineBookingEnabled}
                  />
                ))}
              </div>
            ) : (
              <Slider className="sliderWrapper">
                {venues?.map((v) => (
                  <FeaturedCard
                    key={v.establishmentUuid}
                    cardAnimation={false}
                    slim
                    type={v}
                    name={v.name}
                    description={[v.cityDescription, v.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                    rating={v.averageRating}
                    onlineBookingEnabled={v.onlineBookingEnabled}
                  />
                ))}
              </Slider>
            )
          ) : (
            placeholders
          )}

          <div className="links">
            <div className="empty"></div>
            <Link to="/venues" className="highlighted">
              {t("home:checkAllVenues")}
            </Link>
            <div className="empty"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venues;
