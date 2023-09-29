import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import { store } from './redux/store.js'

// import { } from ''

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			{/* Wrapping the APP inside the Redux Provider
			which will provide access of store to the App */}
			<App />
		</Provider>
	</React.StrictMode>,
)
