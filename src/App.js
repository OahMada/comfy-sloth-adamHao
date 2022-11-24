import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { Home, About, Products, SingleProduct, Cart, Checkout, Error, PrivateRoute, AuthWrapper } from './pages';

function App() {
	return (
		<AuthWrapper>
			<BrowserRouter>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='products' element={<Products />} />
					<Route path='products/:id' element={<SingleProduct />} />
					<Route path='cart' element={<Cart />} />
					<Route
						path='checkout'
						element={
							<PrivateRoute>
								<Checkout />
							</PrivateRoute>
						}
					/>
					<Route path='*' element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</AuthWrapper>
	);
}

export default App;

// TODO
// add products page
// compony checkbox filter course 359
// redirect user to the same page course 380
// hide cart page in private route as well

// DONE
// how many time dispatch runs
// as to useEffect, it runs first time when component mounts to initialize, after initialize, it runs second time and calls the callback, also every time after state changes, it re-run to call the callback too.
// why not check id and color separately. id + color is cartItem id. But is it necessary? for cart page list manipulate
