import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCartContext } from '../context/cart_context';
import axios from 'axios';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
var promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

var StripeWrapper = ({ children }) => {
	let { cart, total_amount, shipping_fee } = useCartContext();
	let [clientSecret, setClientSecret] = useState('');

	let appearance = {
		theme: 'stripe',
	};
	let options = {
		clientSecret,
		appearance,
	};

	useEffect(() => {
		let createPaymentIntent = async () => {
			let { data } = await axios.post(
				'/.netlify/functions/create-payment-intent',
				JSON.stringify({ cart, total_amount, shipping_fee })
			);
			setClientSecret(data.clientSecret);
		};
		createPaymentIntent();
	}, []); // what happens if cart item changed

	return (
		<div className='App'>
			{clientSecret && (
				<Elements options={options} stripe={promise}>
					{children}
				</Elements>
			)}
		</div>
	);
};

export default StripeWrapper;

// stay at the same page
// no refetch clientSecret
// proper clearCart handle
// deny access from url
