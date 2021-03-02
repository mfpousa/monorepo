import { getAccessToken } from "api/auth";
import { API_ROOT, API_HOST } from "ENV";

export interface RemoveFavoriteVenueParams {
  uuid: string;
}

export default ({ uuid }: RemoveFavoriteVenueParams) => {
  return fetch(`${API_HOST}${API_ROOT}/establishments-favourites/${uuid}`, {
    method: "DELETE",
    headers: new Headers([["Authorization", getAccessToken()]]),
  }).then((res) => {
    if (res.ok) {
      return res;
    } else {
      throw res;
    }
  });
};
