import React from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const ReviewCard = ({ review }) => {

   return (
      <div className='reviewCard'>
         <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${review.name}`} alt="User" />
         <p className='name'>{review.name}</p>
         <Rating readOnly value={review.rating} style={{ width: "15vh" }} />
         <span className='comment'>{review.comment}</span>
      </div>
   )
}

export default ReviewCard