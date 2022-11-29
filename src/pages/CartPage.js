import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';
// import { useStripe } from '@stripe/react-stripe-js';

const CartPage = () => {
	let { cart } = useCartContext();

	// let stripe = useStripe();
	// let [message, setMessage] = useState(null);

	// useEffect(() => {
	// 	if (!stripe) {
	// 		return;
	// 	}

	// 	// Retrieve the "payment_intent_client_secret" query parameter appended to
	// 	// your return_url by Stripe.js
	// 	const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

	// 	// Retrieve the PaymentIntent
	// 	stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
	// 		// Inspect the PaymentIntent `status` to indicate the status of the payment
	// 		// to your customer.
	// 		//
	// 		// Some payment methods will [immediately succeed or fail][0] upon
	// 		// confirmation, while others will first enter a `processing` state.
	// 		//
	// 		// [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
	// 		switch (paymentIntent.status) {
	// 			case 'succeeded':
	// 				setMessage('Success! Payment received.');
	// 				break;

	// 			case 'processing':
	// 				setMessage("Payment processing. We'll update you when payment is received.");
	// 				break;

	// 			case 'requires_payment_method':
	// 				// Redirect your user back to your payment page to attempt collecting
	// 				// payment again
	// 				setMessage('Payment failed. Please try another payment method.');
	// 				break;

	// 			default:
	// 				setMessage('Something went wrong.');
	// 				break;
	// 		}
	// 		clearCart();
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [stripe]);

	// if (message) {
	// 	return <h2>{message}</h2>;
	// }

	if (cart.length < 1) {
		return (
			<Wrapper className='page-100'>
				<div className='empty'>
					<h2>Your cart is empty</h2>
					<Link to='/products' className='btn'>
						fill the cart
					</Link>
				</div>
			</Wrapper>
		);
	}
	return (
		<main>
			<PageHero title='cart' />
			<Wrapper className='page'>
				<CartContent />
			</Wrapper>
		</main>
	);
};

const Wrapper = styled.main`
	.empty {
		text-align: center;
		h2 {
			margin-bottom: 1rem;
			text-transform: none;
		}
	}
`;

export default CartPage;
