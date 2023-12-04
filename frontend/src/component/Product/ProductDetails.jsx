import React, { useEffect, useState } from 'react'
import { useGetProductDetailsQuery } from '../../redux/slices/productApiSlice';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Loader from '../layout/Loader/Loader';
import Alert from '../layout/Alert/Alert';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css"
import ReviewCard from './ReviewCard.jsx';
import My_custom_carousel from '../layout/Carousel/My_custom_carousel.jsx';

const ProductDetails = ({ match }) => {
   const { id } = useParams()

   const { data, isLoading, isError, isFetching, isSuccess, error } = useGetProductDetailsQuery(id);

   console.log(data, isLoading, isError, isFetching, isSuccess, error);
   const [Images, setImages] = useState([])
   const WidowWidth = window.innerWidth;
   // const [WidowWidth, setWidowWidth] = useState(window.innerWidth);
   // const imgArr = [
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnem27b5h3dv.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnem27b5h3dv.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemz9nghmh6.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemz9nghmh6.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemehdhbdts.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemehdhbdts.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnem6npt9gjh.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnem6npt9gjh.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemjxnmzcdu.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemjxnmzcdu.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemhabfszgk.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemhabfszgk.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemhabfszgk.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemhabfszgk.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemhfz4w6ru.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemhfz4w6ru.jpeg",
   //    },
   //    {
   //       original: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemktvpgjgj.jpeg",
   //       thumbnail: "https://rukminim2.flixcart.com/image/416/416/k4u7i4w0/headphone/f/x/2/infinity-glide-501-original-imafnnemktvpgjgj.jpeg",
   //    }
   // ]
   useEffect(() => {
      if (isSuccess) {
         let imgs = []
         setImages(data?.product.images)
         // console.log(data?.product.images);
         // data?.product.images.map((item) => imgs.push({ original: item.url, thumbnail: item.url }))
         // setImages(imgs)
      }
   }, [data])
   console.log(Images);
   // console.log(imgArr);

   return (<>
      {isError && <Alert type='error' message={error.error} />}

      {isLoading && <Loader />}
      {isSuccess && <>
         <div className="ProductDetails">

            <My_custom_carousel imgSrcArr={Images} />

            <div>
               <div className="detailsBlock-1">
                  <h2>{data?.product.name}</h2>
                  <p>Product # {data.product._id}</p>
               </div>
               <div className="detailsBlock-2">
                  <Rating readOnly value={data.product.ratings} style={{ width: "15vh" }} />
                  <span>({data.product.num_of_reviews})</span>
               </div>
               <div className="detailsBlock-3">
                  <h1>₹{data.product.price}</h1>

                  <div className="detailsBlock-3-1">

                     <div className="detailsBlock-3-1-1">
                        <button>-</button>
                        <input readOnly type="number" defaultValue={1} /*value={1}*/ />
                        <button>+</button>
                     </div>
                     <button>Add To Cart</button>

                  </div>

                  <p>Status:
                     <b className={data.product.Stock < 1 ? "redColor" : "greenColor"}>
                        {data.product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                     </b></p>
               </div>

               <div className="detailsBlock-4">Description : <p>{data.product.description}</p></div>

               <button className="submitReview">Submit Review</button>
            </div>
         </div>


         <h3 className='reviewsHeading'>REVIEWS</h3>
         {
            data.product.reviews && data.product.reviews[0] ?
               (<div className='reviews'>
                  {data.product.reviews &&
                     data.product.reviews.map((review, i) => <ReviewCard review={review} key={i} />)
                  }
               </div>)
               :
               (<p>No Reviews Yet</p>)
         }

      </>/*isSuccess wala ending */}
   </>)

}

export default ProductDetails
