import React, { useState, useRef, useEffect } from 'react'
import "./carousel.css";
const LeftArrow = () => {
   return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z">
         </path>
      </svg>
   )
}
const RightArrow = () => {
   return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
         </path>
      </svg>
   )
}
const My_custom_carousel = ({ imgSrcArr = [
   "https://res.cloudinary.com/dttl1hovl/image/upload/v1697894484/resized_2_x7phbt.jpg",
   "https://res.cloudinary.com/dttl1hovl/image/upload/v1697894514/GoddessDurga_jf2rgk.webp",
   "https://res.cloudinary.com/dttl1hovl/image/upload/v1697894450/resized_meskb3.png",
   "https://res.cloudinary.com/dttl1hovl/image/upload/v1697893983/copymultiverse-spider-man-no-way-home-artwork-u1nvqt1zhrzpvx3y_xnymsu.jpg",
   "https://res.cloudinary.com/dttl1hovl/image/upload/v1697893872/4_on91xj.jpg",
] }) => {


   const [currentIndex, setcurrentIndex] = useState(0);
   const [touchStartX, setTouchStartX] = useState(null);

   const carousel = useRef(null);

   function showImage(direction) {
      const numImages = imgSrcArr.length;
      let newIndex = (numImages + direction + currentIndex) % numImages;
      setcurrentIndex(newIndex);
   }

   function handleTouchStart(e) {
      // console.log(e); -> touch event
      setTouchStartX(e.touches[0].clientX); // the X coordinate of the touch point
   }
   function handleTouchMove(e) {
      if (touchStartX === null) {
         return;
      }

      const touchX = e.touches[0].clientX;// will give the final touch position after movement of finger on screen
      const deltaX = touchX - touchStartX;
      if (deltaX > 50) {
         // Swipe right
         showImage(-1);
         setTouchStartX(null);
      } else if (deltaX < -50) {
         // Swipe left
         showImage(1);
         setTouchStartX(null);
      }
      /**
       * function is called when the user moves their finger on the screen.
       * It calculates the horizontal distance (deltaX) b/w the current touch position 
       * & the initial touch position. If this distance is greater than 50 pixels 
       * it triggers showImage(-1 or 1); depending on swipe direction.
       */
   }
   function handleTouchEnd() {
      setTouchStartX(null);
   }
   useEffect(() => {
      const x_translate = currentIndex * -100;
      // calc how much % carousel should translate in X in opposite direction to show the currentIndex image
      carousel.current.style.transform = `translateX(${x_translate}%)`
   }, [currentIndex])

   return (
      <div className="section">
         <div className="carousel-container"
            onTouchStart={handleTouchStart} //A finger is placed on a touch screen
            onTouchMove={handleTouchMove} // A finger is dragged across the screen
            onTouchEnd={handleTouchEnd} // A finger is removed from a touch screen
         >
            <div className="carousel" ref={carousel}>
               {imgSrcArr.map((item, i) =>
                  <img src={item} alt={`image ${i}`} key={`img ${i}`}
                     onError={(e) => {
                        e.target.alt = `Img fail to load : ${e.target.alt}`
                     }}
                  />
               )}
            </div>
            <button className="prev-button" onClick={() => showImage(-1)}>
               <LeftArrow />
            </button>
            <button className="next-button" onClick={() => showImage(1)}>
               <RightArrow />
            </button>
            <div className="dots">
               {imgSrcArr.map((item, i) => <div key={i}
                  className={`dot ${i === currentIndex ? "active" : ""}`}
                  onClick={() => showImage(i - currentIndex)}></div>)}
            </div>
         </div>
      </div>
   )
}

export default My_custom_carousel