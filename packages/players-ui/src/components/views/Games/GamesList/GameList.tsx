import React from "react";
import Masonry from "react-responsive-masonry";

import { GameCard } from "../GameCard";
import { useViewport } from "hooks";
import { Game } from "api/games/Game";

import "./GameList.scss";
import { PlaceHolderGamesListing } from "components/atoms";

interface MasonryProps {
  children;
}

const MasonryDesktop: React.FC<MasonryProps> = ({ children }) => (
  <Masonry gutter="20px" columnsCount={2}>
    {children}
  </Masonry>
);

const MasonryPhone: React.FC<MasonryProps> = ({ children }) => (
  <Masonry gutter="20px" columnsCount={1}>
    {children}
  </Masonry>
);

interface GameListProps {
  games: Array<Game>;
  isLoading: boolean;
}

const GameList: React.FC<GameListProps> = ({ games, isLoading }) => {
  const [viewport] = useViewport();
  const arr = [1, 2, 3];

  const gameList = games.map((game) => (
    <GameCard key={game.gameUuid} game={game} />
  ));

  const placeholderList = arr.map((index) => (
    <PlaceHolderGamesListing key={index} />
  ));

  return (
    <div className="GameList">
      {viewport === "largeDesktop" ? (
        <MasonryDesktop>
          {gameList}
          {isLoading && placeholderList}
        </MasonryDesktop>
      ) : (
        <MasonryPhone>
          {gameList}
          {isLoading && placeholderList}
        </MasonryPhone>
      )}
    </div>
  );
};

export default GameList;
