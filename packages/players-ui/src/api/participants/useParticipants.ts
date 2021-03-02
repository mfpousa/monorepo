import { useFetch } from "api/_common";
import { API_ROOT, API_HOST } from "ENV";

import { Participant } from ".";

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
  participants: Array<Participant>;
  isLoading: boolean;
}

interface UseGamesParams {
  gameUuid: string;
}

export default function useGames({
  gameUuid,
}: UseGamesParams): UseGamesReturnType {
  const { data: participants, isLoading, ...other } = useFetch({
    url: `${API_HOST}${API_ROOT}/games/${gameUuid}/game-requests`,
    useAuthorization: false,
    disabled: gameUuid === "",
  });

  return {
    participants,
    isLoading,
    ...other,
  };
}
