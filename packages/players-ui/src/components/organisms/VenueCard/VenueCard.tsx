import React from "react";
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
import { venueCard, venueCardCTA } from "./animation";
import { CardAnimation } from "./CardAnimation";

import "./VenueCard.scss";
import { Venue } from "api/venues";
import { Tip } from "globals/utils";

const VenueCardBookNowBtn = ({ venueUuid, isAvailable }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div variants={venueCardCTA.variants} className="book">
        <Link
          to={`/book/${venueUuid}`}
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

type VenueCardProps = {
  index?: number;
  venueUuid: string;
  type: Venue;
  name: string;
  description: string;
  rating: number;
  distance?: string;
  onlineBookingEnabled?: boolean;
  featured?: boolean;
  slim?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const VenueCard: React.FunctionComponent<VenueCardProps> = ({
  venueUuid,
  type,
  name,
  description,
  rating = 0,
  distance = undefined,
  onlineBookingEnabled = false,
  featured = false,
  slim = false,
  index = undefined,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const controls = useAnimation();

  return (
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
      style={{ background: "#fff", width: "100%" }}
      className={classnames("VenueCard", { slim })}
      {...otherProps}
    >
      <div className="image">
        <div className="venue-type">
          <SportIcon type={type} isInCard={true} />
        </div>
        {featured && <div className="featured">{t("venue-card:featured")}</div>}
        {distance && (
          <div className="distance">
            <Icon size={2}>distance</Icon>
            <span>{distance} miles</span>
          </div>
        )}
        <div className="info">
          <Icon size={2}>info</Icon>
        </div>
      </div>
      <div className="title">{name || t("venue-card:noName")}</div>
      <div className="description">
        {description || t("venue-card:noDescription")}
      </div>

      <div className="tail">
        <div className="rating">
          <span>{rating > 0 ? rating.toFixed(1) : rating}</span>

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
      </div>

      <VenueCardBookNowBtn
        venueUuid={venueUuid}
        isAvailable={onlineBookingEnabled}
      />
    </motion.div>
  );
};

export default VenueCard;
