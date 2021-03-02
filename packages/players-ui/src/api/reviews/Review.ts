export interface Review {
  establishmentReviewUuid: string;
  establishmentUuid: string;
  userUuid: string;
  user: User;
  rating: number;
  userReview: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  genderType: string;
  enabled: boolean;
}
