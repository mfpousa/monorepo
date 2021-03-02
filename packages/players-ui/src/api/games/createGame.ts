import { getAccessToken } from "api/auth";
import { API_HOST, API_ROOT } from "ENV";
export interface CreateGameParams {
  resourceType: string;
  gameMinLevel: string;
  gameMaxLevel: string;
  establishmentUuid: string;
  countryUuid: string;
  provinceUuid: string;
  cityUuid: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  duration: string;
  gameVisibilityType: string;
  totalParticipants: string;
  genderType: string;
}
export default async function CreateGame(params: CreateGameParams) {
  return fetch(`${API_HOST}${API_ROOT}/games`, {
    method: "POST",
    headers: new Headers([
      ["Authorization", getAccessToken()],
      ["content-type", "application/json"],
    ]),
    body: JSON.stringify({
      ...params,
      totalParticipants: parseInt(params.totalParticipants, 10),
    }),
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw response;
    }
  });
}
