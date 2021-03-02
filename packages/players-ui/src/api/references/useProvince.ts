import { useFetch } from "api/_common";
import { API_ROOT, REFERENCE_HOST } from "ENV";

import { Province } from ".";

export interface UseProvinceReturnType {
  province: Province;
  isLoading: boolean;
}

interface UseProvinceProps {
  provinceUuid?: string;
  disabled?: boolean;
}

export default function useProvince({
  provinceUuid = "",
  disabled = false,
}: UseProvinceProps): UseProvinceReturnType {
  const { data: province, isLoading, ...other } = useFetch({
    url: `${REFERENCE_HOST}${API_ROOT}/province/${provinceUuid}`,
    search: {},
    useAuthorization: false,
    disabled,
  });

  return {
    province,
    isLoading,
    ...other,
  };
}
