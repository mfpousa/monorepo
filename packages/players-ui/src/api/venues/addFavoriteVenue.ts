import { getAccessToken } from "api/auth";
import { API_ROOT, API_HOST } from "ENV";

export interface AddFavoriteVenueParams {
  uuid: string;
}

export default async ({ uuid }: AddFavoriteVenueParams) => {
  const res = await fetch(
    `${API_HOST}${API_ROOT}/establishments-favourites/${uuid}`,
    {
      method: "POST",
      headers: new Headers([["Authorization", getAccessToken()]]),
    }
  );
  return res.ok;
};
