import { useFetch } from "api/_common";
import { UseVenuesReturnType } from "./useVenues";
import { API_ROOT, API_HOST } from "ENV";

interface UseFeaturedVenuesReturnType extends UseVenuesReturnType {}

export default function useFeaturedVenues(): UseFeaturedVenuesReturnType {
  const { data, ...other } = useFetch({
    url: `${API_HOST}${API_ROOT}/establishments/featured`,
    useAuthorization: false,
    disabled: false,
  });

  return {
    venues: data?.content || [],
    ...other,
  };
}
