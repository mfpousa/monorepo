import { useFetch } from "api/_common";
import { API_ROOT, REFERENCE_HOST } from "ENV";

import { Province } from ".";

export interface UseProvincesByCountryReturnType {
  provinces: Array<Province>;
  isLoading: boolean;
}

export interface UseProvincesByCountryInput {
  countryUuid: string;
}

export default function UseProvincesByCountry({
  countryUuid = "",
}: UseProvincesByCountryInput): UseProvincesByCountryReturnType {
  const { data: provinces, isLoading, ...other } = useFetch({
    url: `${REFERENCE_HOST}${API_ROOT}/countries/${countryUuid}/provinces`,
    search: {},
    useAuthorization: false,
    disabled: countryUuid === "",
  });

  return {
    provinces,
    isLoading,
    ...other,
  };
}
