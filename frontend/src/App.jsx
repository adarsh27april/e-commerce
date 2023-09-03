import './App.css'
import Header from './component/layout/header/Header.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
import Footer from "./component/layout/footer/Footer.jsx"
import Home from "./component/Home.jsx"


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
			</Routes>

			<Footer />
		</Router >
	)
}

export default App
