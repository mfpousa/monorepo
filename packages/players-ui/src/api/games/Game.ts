export interface Game {
  gameUuid: string;
  resourceType: string;
  resourceTypeDescription?: string;
  gameMinLevel: number;
  gameMaxLevel: number;
  establishmentUuid: number;
  establishment: Establishment;
  countryUuid: string;
  provinceUuid: string;
  cityUuid: string;
  startDate: string;
  endDate: string;
  gameVisibilityType: string;
  genderType: string;
  totalParticipants: number;
  spotsRemaining: number;
  userCreatorUuid: string;
  gameStatusType: string;
  createdAt: string;
  updatedAt: string;
  enabled: string;
}

interface Establishment {
  establishmentUuid: string;
  name: string;
  countryUuid: string;
  countryDescription: string;
  provinceUuid: string;
  provinceDescription: string;
  cityUuid: string;
  cityDescription: string;
  streetName: string;
  streetType: string;
  postalCode: string;
  establishmentType: string;
  phoneNumber: string;
  email: string;
  webSiteUrl: string;
  googleMapsLink: string;
  hasChangingRooms: boolean;
  hasShowers: boolean;
  hasLockers: boolean;
  hasParking: boolean;
  hasCafeBar: boolean;
  hasSteam: boolean;
  hasSauna: boolean;
  hasJacuzzi: boolean;
  hasSolarium: boolean;
  hasPadel: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  totalReviews: number;
}

export interface FilterType {
  resourceType?: string;
  gameMinLevel?: number;
  gameMaxLevel?: number;
  establishmentUuid?: string;
  countryUuid?: string;
  provinceUuid?: string;
  cityUuid?: string;
  startDate?: string;
  endDate?: string;
  genderType?: string;
  gameStatusType?: string;
}
