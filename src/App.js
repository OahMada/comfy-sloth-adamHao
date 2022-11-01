import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { Home, About, Products, SingleProduct, Cart, Checkout, Error, PrivateRoute } from './pages';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Sidebar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='products' element={<Products />} />
				<Route path='products/:id' element={<SingleProduct />} />
				<Route path='cart' element={<Cart />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='*' element={<Error />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

/**
 * lesson 349
 * Is it necessary to make a copy of filteredProducts and create tempProducts?
 * It would be clear when I finish watching filter-related videos, but I assume that the filteredProducts is gonna change when filters are applied, however we can sort the mutated array directly, aren't we?
 */
