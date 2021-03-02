import React from "react";
import { Modal } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { GameList } from "./GamesList";
import { useGames } from "api/games";
import { Header, Footer, Heading, FilterGames } from "components/molecules";
import { FilterSection } from "components/molecules/FilterSection";
import {
  EmptyState,
  InfiniteScroll,
  PlaceHolderGamesListing,
} from "components/atoms";
import { CreateGameForm } from "components/organisms";
import { FilterContext } from "globals/FilterContext";
import { useAuthorization } from "api/auth";

import "./Games.scss";

const CreateGameModal = ({ open, setIsModalOpen, ...otherProps }) => {
  return (
    <Modal
      open={open}
      {...otherProps}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <CreateGameForm />
    </Modal>
  );
};

const Games = ({ history }) => {
  const { t } = useTranslation();
  const { isLoggedIn, login, register, logout } = useAuthorization();
  const { queryStrings, setQueryStrings } = React.useContext(FilterContext);
  const { games, isLoading, nextPage, last, number } = useGames({
    queryStrings,
  });
  const [filters, setFilters] = React.useState<
    Array<{
      query: string;
      value: string;
      type: string;
      description: string;
    }>
  >([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const arr = [1, 2, 3];

  const calculateQueryStrings = (redirectPath: string, type: string) => {
    if (!history) return;

    if (filters.length > 0) {
      const query = {};
      filters.forEach((item) => {
        if (item.value !== "") {
          query[item.query] = item.value;
        }
      });
      setQueryStrings(query);
      history.replace({
        pathname: redirectPath,
        search: `?${new URLSearchParams(query).toString()}`,
      });
      return;
    }

    const params = new URLSearchParams(location.search);
    if (params?.toString()?.length > 0) {
      const temp = {};
      const filterTemp = [];
      for (let q of params) {
        if (q[1] !== "") {
          temp[q[0]] = q[1];
          filterTemp.push({
            query: q[0],
            value: q[1],
            type,
          });
        }
      }
      setQueryStrings(temp);
      setFilters(filterTemp);
      history.replace({
        pathname: redirectPath,
        search: `?${params.toString()}`,
      });
      return;
    }
    setQueryStrings({});
    history.push(redirectPath);
  };

  React.useEffect(() => {
    calculateQueryStrings("/games", "games");
  }, [filters]);

  const placeholderList = arr.map((index) => (
    <PlaceHolderGamesListing key={index} />
  ));

  if (isLoading && number === 0) {
    return (
      <div className="Games" id="#top">
        <Header gray withSeparator />
        <div className="wrapper">
          <Heading
            title={t("games:title")}
            description={t("games:description")}
          />
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            isLoading={isLoading}
            withCreateGameBtn
          >
            <FilterGames />
          </FilterSection>

          <div className="PlaceHolderGamesListing">{placeholderList}</div>
        </div>
      </div>
    );
  }

  const handleCreateGame = () => {
    if (!isLoggedIn) {
      login().then(() => {});
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="Games" id="#top">
      <Header gray withSeparator />
      <div className="wrapper">
        <Heading
          title={t("games:title")}
          description={t("games:description")}
        />
        <CreateGameModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <FilterSection
          withCreateGameBtn
          isLoading={isLoading}
          filters={filters}
          setFilters={setFilters}
          createBtnCallback={handleCreateGame}
        >
          <FilterGames />
        </FilterSection>
        {games?.length > 0 ? (
          <>
            <GameList games={games} isLoading={isLoading} />
            {!last && <InfiniteScroll callback={nextPage} />}
          </>
        ) : filters?.length > 0 ? (
          <EmptyState title={t("atoms:noItems")} />
        ) : (
          <EmptyState title="No items" />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Games;
