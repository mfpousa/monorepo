import { usePaginatedFetch } from "api/_common";
import { API_ROOT, API_HOST } from "ENV";

import addFavoriteVenue from "./addFavoriteVenue";
import removeFavoriteVenue from "./removeFavoriteVenue";

interface UseFavoriteVenuesParams {
  name?: string;
}

export default ({ name }: UseFavoriteVenuesParams = {}) => {
  const { entries: establishments, forceUpdate, ...other } = usePaginatedFetch({
    url: `${API_HOST}${API_ROOT}/establishments-favourites`,
    useAuthorization: true,
    disabled: false,
    updateOn: [name],
    disableOnUnauthorized: true,
  });

  return {
    establishments,
    addFavorite: ({ uuid }) => addFavoriteVenue({ uuid }).then(forceUpdate),
    removeFavorite: ({ uuid }) =>
      removeFavoriteVenue({ uuid }).then(forceUpdate),
    ...other,
  };
};
