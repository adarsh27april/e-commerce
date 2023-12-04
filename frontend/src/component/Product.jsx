import React from 'react'
import { Link } from "react-router-dom"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Product = ({ product }) => {
   return (<>
      <Link className='productCard' to={`product/${product._id}`}>
         <img src={product.images[0].url} alt={product.name} loading='lazy' />
         <p>{product.name}</p>
         <div>
            <Rating readOnly value={product.rating} />
            <span>(product.num_of_reviews)</span>
         </div>
         <span>₹{product.price}</span>
      </Link>
   </>)
}

export default Product