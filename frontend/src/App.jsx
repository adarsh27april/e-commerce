import './App.css'
import Header from './component/layout/header/Header.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
import Footer from "./component/layout/footer/Footer.jsx"
import Home from "./component/Home.jsx"
import ProductDetails from './component/Product/ProductDetails';
import Loader from './component/layout/Loader/Loader';
import Alert from './component/layout/Alert/Alert.jsx';
import My_custom_carousel from './component/layout/Carousel/My_custom_carousel';
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";


function App() {

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droid Sans", "Chilanka"]
			}
		})
	})

	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/product/:id" element={<ProductDetails />} />
				<Route exact path="/products" element={<Products />} />{/*products route from the */}
				<Route exact path="/search" element={Search} />
			</Routes>

			<Footer />
		</Router >
	)
}

export default App
