import React from 'react'
import playstore from "../../../assets/images/playstore.svg"
import appstore from "../../../assets/images/Appstore.svg"
import "./Footer.css"

const Footer = () => {
   return (<>
      <footer id="footer">
         <div className="leftFooter">
            <h4>Download our App</h4>
            <p>Try our Android and IOS App</p>
            <img alt="Google Play Store" src={playstore} />
            <img alt="IOS App Store" src={appstore} />
         </div>

         <div className="midFooter">
            <h1>MERN e-Commerce</h1>
            <p>High Quality Products at affordable prices</p>
            <p>Copyright 2023 &copy; Barbarik</p>
         </div>

         <div className="rightFooter">
            <h4>Have a Look at my works</h4>
            <a href="https://github.com/adarsh27april/e-commerce" target='_blank'>Github</a>
            <a href="http://www.linkedin.com/in/adarsh-kumar-singh-6b4242193/" target='_blank'>LinkedIn</a>
            <a href="http://github.com/adarsh27april" target='_blank'>Github Barbarik</a>
         </div>
      </footer>
   </>)
}

export default Footer