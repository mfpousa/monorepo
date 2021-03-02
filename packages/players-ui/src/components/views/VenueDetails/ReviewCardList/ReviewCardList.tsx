import React from "react";
import { CustomScrollBar } from "components/atoms";
import { ReviewCard } from "components/molecules";

import { useReviews } from "api/reviews";

import "./ReviewCardList.scss";

const ReviewCardList = ({ establishmentUuid, totalReviews }) => {
  const { reviews, isLoading } = useReviews({ establishmentUuid });

  return (
    <div className="ReviewCardList">
      <div className="title">Reviews({totalReviews})</div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : reviews.length > 0 ? (
        <CustomScrollBar maxHeight={479}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </CustomScrollBar>
      ) : (
        <div className="no-reviews">We can't find any review</div>
      )}
      <div className="bottom-shadow" />
    </div>
  );
};

export default ReviewCardList;
