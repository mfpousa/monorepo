export interface Country {
  countryUuid: string;
  description: string;
}

export interface Province {
  provinceUuid: string;
  description: string;
  countryUuid: string;
  tierId: number;
}

export interface City {
  cityUuid: string;
  description: string;
  provinceUuid: string;
}
