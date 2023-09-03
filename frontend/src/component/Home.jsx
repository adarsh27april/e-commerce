import React from 'react'
// import { CgMouse } from "react-icons/all"
import cgmouse from "../assets/images/cgmouse.svg"
import "./Home.css"
import Product from "./Product.jsx"

const product = {
   name: "Blue T-Shirt",
   images: [{ url: "https://res.cloudinary.com/dttl1hovl/image/upload/v1693738131/blue_tshirt_a7y0y3.png" },],
   price: 3000,
   rating: 2.3,
   _id: "blue_tshirt"
}

const Home = () => {
   return (<>
      <div className="banner">
         <p>Welcome to MERN e-Commerce</p>
         <h1>Find Amazing Products below</h1>
         <a href="#container"><button>Scroll <img src={cgmouse} /> </button></a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
         <Product product={product} />
         <Product product={product} />
         <Product product={product} />
         <Product product={product} />
         <Product product={product} />
         <Product product={product} />
         <Product product={product} />
         <Product product={product} />
      </div>
   </>)
}

export default Home