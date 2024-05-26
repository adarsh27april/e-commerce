import React, { useState } from 'react'

const Search = () => {
   const [Keyword, setKeyword] = useState("")
   const onSubmitHandler = (e) => {
      e.preventDefault();
      if (Keyword.trim()) {
         history.push(`/products/${Keyword}`)
      } else {
         history.push("/products")
      }
   }
   return (<>
      <form action="" className="searchBox">
         <input type="text" placeholder='Search a Peoduct ...'
            onChange={(e) => setKeyword(e.target.value)}
         />
         <input type="submit" value="Search" />
      </form>
   </>)
}

export default Search