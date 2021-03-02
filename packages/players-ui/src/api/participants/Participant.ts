export interface Participant {
  gameRequestUuid: string;
  senderUuid: string;
  gameUuid: string;
  targetUserEntityDto: TargetUserEntityDto;
  position: number;
  gameRequestStatusType: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
}

export interface TargetUserEntityDto {
  id: string;
  firstName: string;
  lastName: string;
  genderType: string;
  enabled: boolean;
}
