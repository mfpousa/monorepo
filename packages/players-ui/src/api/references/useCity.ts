import { useFetch } from "api/_common";
import { API_ROOT, REFERENCE_HOST } from "ENV";

import { City } from ".";

export interface UseCityReturnType {
  city: City;
  isLoading: boolean;
}

interface UseCityProps {
  cityUuid?: string;
  disabled?: boolean;
}

export default function useCity({
  cityUuid = "",
  disabled = false,
}: UseCityProps): UseCityReturnType {
  const { data: city, isLoading, ...other } = useFetch({
    url: `${REFERENCE_HOST}${API_ROOT}/cities/${cityUuid}`,
    search: {},
    useAuthorization: false,
    disabled,
  });

  return {
    city,
    isLoading,
    ...other,
  };
}
