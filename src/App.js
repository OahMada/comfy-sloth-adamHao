import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
	Home,
	About,
	Products,
	SingleProduct,
	Cart,
	Checkout,
	Error,
	PrivateRoute,
	AuthWrapper,
	StripeWrapper,
	PaymentCompletePage,
} from './pages';

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
								<StripeWrapper>
									<Checkout />
								</StripeWrapper>
							</PrivateRoute>
						}
					/>
					<Route
						path='payment-complete'
						element={
							<PrivateRoute>
								<PaymentCompletePage />
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
// redirect user to the same page course 380
// stripe setup

// DONE
// more advanced pagination? when change display mode, always make sure the first product stays same
// Compony checkbox filter course 359
// steps:
// 1, populate initial company state when load products
// 2, display checkboxes at the page
// 3, make checkboxes controlled input: live update checkboxes checked state
// 4, filter products based on the state
// 5, fix bugs relates to pagination
// Add products page
// points:
// 1, new state value contain products per page: paginated_products
// 2, perform pagination after sorting, make paginated_products a subset of filtered_products
// 3, determine what products to show based on current page
// 4, handle page changes
// how many time dispatch runs
// as to useEffect, it runs first time when component mounts to initialize, after initialize, it runs second time and calls the callback, also every time after state changes, it re-run to call the callback too.
// why not check id and color separately. id + color is cartItem id. But is it necessary? for cart page list manipulate
