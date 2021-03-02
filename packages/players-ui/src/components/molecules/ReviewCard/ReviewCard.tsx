import React from "react";
import { Icon } from "components/atoms";
import { Review } from "api/reviews";

import "./ReviewCard.scss";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const iconStar = (index) => {
    const filledStars = Math.floor(rating);
    const hasDot = rating / Math.floor(rating) > 1 ? true : false;

    if (index <= filledStars) {
      return "star-filled";
    } else if (filledStars + 1 === index && hasDot) {
      return "star-half-full";
    } else if (rating < index) {
      return "star-empty";
    }
  };

  return (
    <div className="rating-wrapper">
      <ul>
        <li>
          <Icon>{iconStar(1)}</Icon>
        </li>
        <li>
          <Icon>{iconStar(2)}</Icon>
        </li>
        <li>
          <Icon>{iconStar(3)}</Icon>
        </li>
        <li>
          <Icon>{iconStar(4)}</Icon>
        </li>
        <li>
          <Icon>{iconStar(5)}</Icon>
        </li>
      </ul>
      <span className="rating">{rating}</span>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="ReviewCard">
      <div className="review-card-header">
        <div className="user-info-wrapper">
          <div className="user-avatar">
            {review.user.genderType === "FEMALE" ? (
              <Icon size={4.125}>avatar-female</Icon>
            ) : (
              <Icon size={4.125}>avatar-male</Icon>
            )}
          </div>
          <p className="user-name">{review.user.firstName}</p>
        </div>

        <RatingStars rating={review.rating} />
      </div>
      <div className="review-card-body">
        <p className="review">{review.userReview}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
