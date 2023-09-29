import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './Alert.css'
import { FaRegCircleCheck, FaXmark } from 'react-icons/fa6/'
import { HiOutlineExclamationTriangle, HiOutlineExclamationCircle } from 'react-icons/hi2'
import { LuInfo } from 'react-icons/lu'

const Alert = (props) => {
   const { type = 'error', message = 'this is an error message', time = 5 } = props;
   let colorVar, bgColor;

   switch (type) {
      case "success":
         colorVar = "rgb(21 128 61)"// bg-green-700
         bgColor = "rgb(187 247 208)"
         break;
      case "info":
         colorVar = "rgb(37 99 235)"//bg-blue-600	
         bgColor = "rgb(219 234 254)"//bg-blue-100	
         break;
      case "warning":
         colorVar = "rgb(202 138 4)" //bg-yellow-600	
         bgColor = "rgb(254 249 195)"// bg-yellow-100
         break;
      default://error
         colorVar = "rgb(220 38 38)"//bg-red-600	
         bgColor = "rgb(254 202 202)";
         break;
   }
   const alertTypeIconStyle = { color: `${colorVar}`, fontSize: "3vmax" }

   const [isActive, setIsActive] = useState(true);

   const handleCloseClick = () => {
      setIsActive(false);
   };

   return (<>

      {isActive &&
         <div className='alert-parent'>
            <div className='alert-box' style={{ borderColor: colorVar, background: bgColor }}>

               <div className="alert-content">

                  {type === "success" && <FaRegCircleCheck style={alertTypeIconStyle} />}
                  {type === "info" && <LuInfo style={alertTypeIconStyle} />}
                  {type === "warning" && <HiOutlineExclamationTriangle style={alertTypeIconStyle} />}
                  {type === "error" && <HiOutlineExclamationCircle style={alertTypeIconStyle} />}

                  <span className='alert-message' style={{ color: colorVar, }}>
                     {message}
                  </span>

                  <FaXmark className='FaXmark' onClick={handleCloseClick} style={{ color: colorVar }} />
               </div>

               <div className='progress-line-parent'>

                  <div className="progress-line" style={{
                     "animation": `progress_Fill_Animate ${time}s linear forwards`,
                     "backgroundColor": colorVar
                  }}></div>

               </div>
            </div >
         </div >
      }
   </>);
};

// Alert.propTypes = {
// type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
// message: PropTypes.string.isRequired,
// };
export default Alert;