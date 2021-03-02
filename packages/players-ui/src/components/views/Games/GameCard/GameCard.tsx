import React from "react";
import classnames from "classnames";
import moment from "moment";
import {
  StatusFlag,
  CardHeading,
  CardTime,
  CardPlaceInfo,
  CardSpotsRemaining,
} from "./";
import { Game } from "api/games/Game";

import { calculateStartDateInGames } from "globals/utils";
import { useCalculateStatusInfo, useViewport } from "hooks";

import "./GameCard.scss";
interface GameCardProps {
  game: Game;
  haveMarginRight: boolean;
  haveMarginLeft: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  haveMarginRight = false,
  haveMarginLeft = false,
}) => {
  const [viewport] = useViewport();
  const classes = classnames("GameCard", { haveMarginRight, haveMarginLeft });
  const { days, status } = useCalculateStatusInfo(game.startDate);
  const address = `${game.establishment.postalCode} ${game.establishment.cityDescription}, ${game.establishment.provinceDescription}`;

  return (
    <div className={classes}>
      {(viewport === "largeDesktop" || viewport === "desktop") && (
        <StatusFlag days={days} status={status} />
      )}
      <CardHeading
        title={game.resourceType}
        resourceType={game.resourceType}
        personsQty={game.totalParticipants}
        distance={3.4}
      />
      <div className="venue-time-info-container">
        <CardTime
          date={calculateStartDateInGames(game.startDate)}
          time={moment(game.startDate).format("h:mm A")}
          minLevel={game.gameMinLevel}
          maxLevel={game.gameMaxLevel}
          distance={3.4}
        />

        {viewport !== "largeDesktop" && viewport !== "desktop" && (
          <StatusFlag days={days} status={status} />
        )}
      </div>
      <CardPlaceInfo
        establishmentDetail={game.establishment}
        imgPath="/images/venue4.jpg"
      />
      <CardSpotsRemaining
        genderType={game.genderType}
        spotsRemaining={game.spotsRemaining}
        participants={game.totalParticipants}
        gameUuid={game?.gameUuid}
      />
    </div>
  );
};

export default GameCard;
