import { usePaginatedFetch } from "api/_common";
import { API_ROOT, API_HOST } from "ENV";

import { Venue, FilterType } from "./Venue";

export interface UseVenuesReturnType {
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  isLoading?: boolean;
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
  venues: Array<Venue>;
  nextPage?: () => void;
}

interface UseVenuesParams {
  queryStrings?: FilterType;
}

export default function useVenues({
  queryStrings,
}: UseVenuesParams = {}): UseVenuesReturnType {
  const {
    entries: venues,
    isLoading,
    isLastPage,
    nextPage,
    page,
    ...other
  } = usePaginatedFetch({
    url: `${API_HOST}${API_ROOT}/establishments`,
    search: {
      ...queryStrings,
    },
    useAuthorization: true,
    disabled: false,
    updateOn: [queryStrings],
  });

  return {
    venues,
    isLoading,
    nextPage,
    last: isLastPage,
    number: page,
    ...other,
  };
}
