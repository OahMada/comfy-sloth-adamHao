/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { PageHero } from '../components';
import { Navigate } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';

const PaymentCompletePage = () => {
	let stripe = useStripe();
	let [message, setMessage] = useState(null);
	let [clientSecret, setClientSecret] = useState(null);
	let { clearCart } = useCartContext();

	useEffect(() => {
		clearCart();
		if (!stripe) {
			return;
		}

		// Retrieve the "payment_intent_client_secret" query parameter appended to
		// your return_url by Stripe.js
		const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
		setClientSecret(clientSecret);

		// Retrieve the PaymentIntent
		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			// Inspect the PaymentIntent `status` to indicate the status of the payment
			// to your customer.
			//
			// Some payment methods will [immediately succeed or fail][0] upon
			// confirmation, while others will first enter a `processing` state.
			//
			// [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Success! Payment received.');
					break;

				case 'processing':
					setMessage("Payment processing. We'll update you when payment is received.");
					break;

				case 'requires_payment_method':
					// Redirect your user back to your payment page to attempt collecting
					// payment again
					setMessage('Payment failed. Please try another payment method.');
					break;

				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	// if (!clientSecret) {
	// 	return <Navigate to='/' />;
	// }
	return (
		<main>
			<PageHero title='payment complete' />
			<Wrapper className='page'>{message}</Wrapper>
		</main>
	);
};
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.empty {
		text-align: center;
	}
`;
export default PaymentCompletePage;
