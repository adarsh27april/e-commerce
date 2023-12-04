import React from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const ReviewCard = ({ review }) => {

   return (
      <div className='reviewCard'>
         <img src="" alt="User" />
         <p>{review.name}</p>
         <Rating readOnly value={review.rating} style={{ width: "15vh" }} />
         <span>{review.comment}</span>
      </div>
   )
}

export default ReviewCard