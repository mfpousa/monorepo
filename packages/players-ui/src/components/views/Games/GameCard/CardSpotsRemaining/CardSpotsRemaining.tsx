import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Icon } from "components/atoms/Icon";

import SpotList from "./SpotList/SpotList";
import {
  gameCardContainerAnimation,
  gameCardIconAnimation,
  gameCardSpotsAnimation,
} from "./animation";

import "./CardSpotsRemaining.scss";

interface CardSpotsRemainingProps {
  spotsRemaining: number;
  genderType: string;
  participants: number;
  gameUuid: string;
}

const CardSpotsRemaining = ({
  spotsRemaining,
  genderType = "Any",
  participants,
  gameUuid,
}: CardSpotsRemainingProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      className="CardSpotsRemaining"
      initial="close"
      animate={isOpen ? "open" : "close"}
      variants={gameCardContainerAnimation.variants}
    >
      <button
        className="btn-toggle-players-info"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="players-remaining">
          <h3>{t("games:playersBtnText")}</h3>
          <p>
            ({spotsRemaining} {t("games:spotsRemainingText")})
          </p>
        </div>
        <motion.div
          className="icon-container"
          animate={isOpen ? "open" : "close"}
          initial="close"
          variants={gameCardIconAnimation.variants}
        >
          <Icon size={2}>{isOpen ? "minus" : "plus"}</Icon>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="spots-remaining"
            initial="close"
            animate="open"
            exit="close"
            variants={gameCardSpotsAnimation.variants}
          >
            <div className="gender-info">
              <p className="gender-label">{t("games:genderText")}</p>
              <div className="gender-value">
                <p>{t(`genderType:${genderType}`)}</p>
              </div>
            </div>
            <SpotList
              size={participants > 4 ? "lg" : "sm"}
              spotsRemaining={spotsRemaining}
              participantsNum={participants}
              gameUuid={gameUuid}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardSpotsRemaining;
