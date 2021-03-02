import { usePaginatedFetch } from "api/_common";
import { API_ROOT, API_HOST } from "ENV";

import { Game, FilterType } from "./";

export interface UseGamesReturnType {
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  size?: number;
  number?: number;
  numberOfElements?: number;
  first?: boolean;
  sort?: { unsorted: boolean; sorted: boolean; empty: boolean };
  empty?: boolean;
  pageable?: {
    sort: { unsorted: boolean; sorted: boolean; empty: boolean };
    offset: number;
    pageSize: number;
    paged: boolean;
  };
  games: Array<Game>;
  isLoading: boolean;
  nextPage: () => void;
}

interface UseGamesParams {
  queryStrings?: FilterType;
}

export default function useGames({
  queryStrings,
}: UseGamesParams): UseGamesReturnType {
  const {
    entries: games,
    isLoading,
    isLastPage,
    nextPage,
    page,
    ...other
  } = usePaginatedFetch({
    url: `${API_HOST}${API_ROOT}/games`,
    search: queryStrings,
    useAuthorization: false,
    disabled: false,
    updateOn: [queryStrings],
  });

  return {
    games,
    isLoading,
    nextPage,
    last: isLastPage,
    number: page,
    ...other,
  };
}
