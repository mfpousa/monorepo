import React from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { Participant, useParticipants } from "api/participants";

import "./SpotList.scss";

interface SpotItemProps {
  numberIndicator: number;
  showJoinButton?: boolean;
  imgPath: string;
  participant?: Participant;
}

const SpotItem = ({
  numberIndicator = 1,
  showJoinButton = false,
  imgPath = "",
  participant = null,
}: SpotItemProps) => {
  const { t } = useTranslation();

  if (participant) {
    return (
      <li className={classnames("spot-item", "isFilled")}>
        <h3 className="spot-num-indicator">{numberIndicator}</h3>
        <div className="spot-container">
          <img src={imgPath} alt="Person name" />
          <div className="level-flag">
            <span>L3</span>
          </div>
        </div>
        <div className="spot-person-name">
          <p className="with-person">
            {participant?.targetUserEntityDto?.firstName}.{" "}
            {participant?.targetUserEntityDto?.lastName.charAt(0).toUpperCase()}
          </p>
        </div>
      </li>
    );
  }

  return (
    <li className={classnames("spot-item")}>
      <h3 className="spot-num-indicator">{numberIndicator}</h3>
      <div className="spot-container">
        <p className="empty-msg">{t("games:emptyText")}</p>
      </div>
      <div className="spot-person-name">
        {showJoinButton && (
          <button className="join-btn">{t("games:joinBtnText")}</button>
        )}
      </div>
    </li>
  );
};

interface SpotListProps {
  size: string;
  spotsRemaining: number;
  participantsNum: number;
  gameUuid: string;
}

const SpotList = ({
  size,
  spotsRemaining,
  participantsNum,
  gameUuid,
}: SpotListProps) => {
  const { participants: _participants, isLoading } = useParticipants({
    gameUuid,
  });
  const [participants, setParticipants] = React.useState([]);
  const classes = classnames("spots-list", {
    "sm-grid": size === "sm",
    "lg-grid": size === "lg",
  });

  React.useEffect(() => {
    if (!isLoading) {
      const persons = Array(
        Math.abs(_participants.length - participantsNum)
      ).fill(null);
      setParticipants([..._participants, ...persons]);
    }
  }, [_participants, isLoading, participantsNum]);

  return (
    <ul className={classes}>
      {!isLoading
        ? participants?.map((participant, idx) => {
            return (
              <SpotItem
                key={idx}
                numberIndicator={idx + 1}
                showJoinButton={_participants.length === idx}
                participant={participant}
                imgPath="https://images.pexels.com/photos/34703/tennis-girl-woman-portrait.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            );
          })
        : Array(size === "sm" ? 4 : 5)
            .fill(null)
            .map((_, idx) => (
              <SpotItem
                key={idx}
                numberIndicator={idx + 1}
                imgPath="https://images.pexels.com/photos/34703/tennis-girl-woman-portrait.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            ))}
    </ul>
  );
};

export default SpotList;
