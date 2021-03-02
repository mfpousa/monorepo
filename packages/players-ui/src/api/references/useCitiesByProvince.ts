import { useFetch } from "api/_common";
import { API_ROOT, REFERENCE_HOST } from "ENV";

import { City } from ".";

export interface UseCitiesByProvinceReturnType {
  cities: Array<City>;
  isLoading: boolean;
}

export interface UseCitiesByProvince {
  provinceUuid: string;
}

export default function UseCitiesByProvince({
  provinceUuid = "",
}: UseCitiesByProvince): UseCitiesByProvinceReturnType {
  const { data: cities, isLoading, ...other } = useFetch({
    url: `${REFERENCE_HOST}${API_ROOT}/provinces/${provinceUuid}/cities`,
    search: {},
    useAuthorization: false,
    disabled: provinceUuid === "",
  });

  return {
    cities,
    isLoading,
    ...other,
  };
}
