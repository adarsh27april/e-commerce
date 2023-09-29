import React from 'react'
import Helmet from "react-helmet"

/* To add title to page by passing as a Prop 
------Helmet basically edits metadata of the Page------
*/
const Metadata = ({ title }) => {
   return (
      <Helmet>
         <title>{title}</title>
      </Helmet>
   )
}

export default Metadata