import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// extra imports
// import { useCartContext } from '../context/cart_context';
// import { Navigate } from 'react-router-dom';

const CheckoutPage = () => {
	// let { cart } = useCartContext();
	// const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

	// if (!clientSecret) {
	// 	return <Navigate to='/' />;
	// }
	return (
		<main>
			<PageHero title='checkout' />
			<Wrapper className='page'>
				{/* {cart.length < 1 ? <Navigate to='/' /> :  */}
				<StripeCheckout />
				{/* } */}
			</Wrapper>
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
export default CheckoutPage;
