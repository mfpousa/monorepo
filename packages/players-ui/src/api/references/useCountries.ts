import { useFetch } from "api/_common";
import { API_ROOT, REFERENCE_HOST } from "ENV";

import { Country } from ".";

export interface UseCountriesReturnType {
  countries: Array<Country> | Country;
  isLoading: boolean;
}

interface UseCountriesProps {
  countryUuid?: string;
  disabled?: boolean;
}

export default function useCountries({
  countryUuid = "",
  disabled = false,
}: UseCountriesProps): UseCountriesReturnType {
  const { data: countries, isLoading, ...other } = useFetch({
    url: `${REFERENCE_HOST}${API_ROOT}/countries/${countryUuid}`,
    search: {},
    useAuthorization: false,
    disabled,
  });

  return {
    countries: countryUuid
      ? (countries as Country)
      : (countries as Array<Country>),
    isLoading,
    ...other,
  };
}
