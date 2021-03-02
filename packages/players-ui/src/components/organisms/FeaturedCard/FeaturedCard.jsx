import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useAnimation,
} from "framer-motion";

import { Icon } from "components/atoms";
import { SportIcon } from "components/organisms";
import { VenueDetailsModal } from "components/molecules";
import { venueCard, venueCardCTA } from "./animation";
import { CardAnimation } from "./CardAnimation";
import { Tip } from "globals/utils";

import "./FeaturedCard.scss";

const VenueCardBookNowBtn = ({ bookingUuid = "", isAvailable }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div variants={venueCardCTA.variants} className="book">
        <Link
          to={`/book/${bookingUuid}`}
          className={classnames({
            highlighted: isAvailable,
            isNotAvailable: !isAvailable,
          })}
        >
          {t("venue-card:bookNow")}
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

const SetAnimation = ({ whitAnimation, children, originOffset, index }) => {
  const controls = useAnimation();

  return (
    <div className="card">
      {whitAnimation === true ? (
        <AnimateSharedLayout>
          <CardAnimation
            children
            idx={index}
            originIndex={26}
            delayPerPixel={0.0015}
            originOffset={originOffset}
          >
            <motion.div
              layout
              onHoverStart={() => {
                controls.start("open");
              }}
              onHoverEnd={() => {
                controls.start("closed");
              }}
              transition={venueCard.transition}
              variants={venueCard.variants}
              animate={controls}
              initial="closed"
              style={{ background: "fff" }}
            >
              {children}
            </motion.div>
          </CardAnimation>
        </AnimateSharedLayout>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

const FeaturedCard = ({
  cardAnimation,
  bookingUuid,
  type: e,
  name,
  description,
  rating = 0,
  distance,
  featured,
  slim,
  index,
  originOffset,
  onlineBookingEnabled,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [venueDetail, setVenueDetail] = useState(true);
  const handleClose = () => setOpen(false);
  const handleOpenDetail = () => {
    setVenueDetail(e);
    setOpen(true);
  };

  return (
    <SetAnimation
      className="SetAnimation"
      whitAnimation={cardAnimation}
      idx={index}
      originOffset={originOffset}
      originIndex={26}
      delayPerPixel={0.0015}
      layout
      transition={venueCard.transition}
      variants={venueCard.variants}
      initial="closed"
    >
      <div {...otherProps} className={classnames("FeaturedCard", { slim })}>
        <div className="image">
          <div className="venue-type">
            <SportIcon type={e} isInCard={true} />
          </div>
          {featured && (
            <div className="featured">{t("venue-card:featured")}</div>
          )}
          {distance && (
            <div className="distance">
              <Icon size={2}>distance</Icon>
              <span>{distance} miles</span>
            </div>
          )}
          <button
            className="info"
            aria-label="Featured venue info"
            onClick={handleOpenDetail}
          >
            <Icon size={2}>info</Icon>
          </button>
        </div>
        <div className="title">{name || t("venue-card:noName")}</div>
        <div className="description">
          {description || t("venue-card:noDescription")}
        </div>

        <div className="tail">
          <div className="rating">
            <span>{rating}</span>
            <Tip title={t("venue-card:ratingToolTip")}>
              <div>
                <Icon size={2}>star-filled</Icon>
              </div>
            </Tip>
          </div>

          <Tip title={t("venue-card:addToFavouriteToolTip")}>
            <div>
              <Icon size={2.5}>add-to-favourite</Icon>
            </div>
          </Tip>

          <VenueCardBookNowBtn
            withAnimation={cardAnimation}
            isAvailable={onlineBookingEnabled}
          />
        </div>
        <VenueDetailsModal
          open={open}
          onClose={handleClose}
          venue={venueDetail}
        />
      </div>
    </SetAnimation>
  );
};

export default FeaturedCard;
