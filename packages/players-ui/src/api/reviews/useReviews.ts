import { usePaginatedFetch } from "api/_common";
import { API_ROOT, API_HOST } from "ENV";

import { Review } from "./";

export interface UseReviewsReturnType {
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
  reviews: Array<Review>;
  isLoading: boolean;
}

interface UseReviewParams {
  establishmentUuid: string;
}

export default function useReviews({
  establishmentUuid,
}: UseReviewParams): UseReviewsReturnType {
  const { entries: reviews, isLoading, ...other } = usePaginatedFetch({
    url: `${API_HOST}${API_ROOT}/establishments/${establishmentUuid}/reviews`,
    useAuthorization: false,
    disabled: establishmentUuid === "",
    disableOnUnauthorized: true,
    updateOn: [],
  });

  return {
    reviews,
    isLoading,
    ...other,
  };
}
