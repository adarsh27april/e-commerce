import React from 'react'
import "./Products.css"
import { useGetAllProductsQuery } from '../../redux/slices/productApiSlice'
import Alert from '../layout/Alert/Alert'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../ProductCard'

const Products = () => {
   const { data, isLoading, isError, isFetching, isSuccess, error } = useGetAllProductsQuery("");
   return (<>
      {isLoading && <div><Loader /></div>}
      {isError && <Alert type='error' message={error.error} />}
      {isSuccess && <>
         <h2 className='productsHeading'>Products</h2>
         <div className="products">
            {data.products.map((item, i) => {
               return <ProductCard product={item} key={i} />
            })}
         </div>
      </>}
   </>)
}

export default Products