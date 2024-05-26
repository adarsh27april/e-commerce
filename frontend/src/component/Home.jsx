import React from 'react'
// import { CgMouse } from "react-icons/all"
import cgmouse from "../assets/images/cgmouse.svg"
import "./Home.css"
import ProductCard from "./ProductCard.jsx"
// import Metadata from './layout/Metadata'
import { useGetAllProductsQuery } from '../redux/slices/productApiSlice'
import Loader from './layout/Loader/Loader'
import Alert from './layout/Alert/Alert'

const product = {
   name: "Blue T-Shirt",
   images: [{ url: "https://res.cloudinary.com/dttl1hovl/image/upload/v1693738131/blue_tshirt_a7y0y3.png" },],
   price: 3000,
   rating: 2.3,
   _id: "blue_tshirt"
}

const Home = () => {

   const { data, isLoading, isError, isFetching, isSuccess, error } = useGetAllProductsQuery("");
   console.log(data, isLoading, isError, isFetching, isSuccess, error);

   return (
      <>
         {isError && <Alert type='error' message={error.error} />}

         {isLoading ? <div><Loader /></div> :
            <>
               <div className="banner">
                  <p>Welcome to MERN e-Commerce</p>
                  <h1>Find Amazing Products below</h1>
                  <a href="#container"><button>Scroll <img src={cgmouse} /> </button></a>
               </div>
               <h2 className="homeHeading">Featured Products</h2>

               <div className="container" id="container">

                  {
                     data?.products.map((item, index) => <ProductCard product={item} key={index} />)
                  }
                  {/* <ProductCard product={product} /> */}

               </div>
            </>}
      </>)
}

export default Home