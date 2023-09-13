
import React, { useState, useEffect, useRef } from "react";
import StarRatings from "react-star-ratings";

export default function HoverRating() {

  

  return (
    <StarRatings
      rating={rating}
      starRatedColor="orange"
      changeRating={setRating}
      numberOfStars={5}
      name="rating"
      starDimension="30px"
    />
  );
}
