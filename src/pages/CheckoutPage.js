import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckoutForm } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Navigate } from 'react-router-dom';

const CheckoutPage = () => {
	let { cart } = useCartContext();

	return (
		<main>
			<PageHero title='checkout' />
			<Wrapper className='page'>
				{/* {cart.length < 1 ? <Navigate to='/' /> :  */}
				<StripeCheckoutForm />
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
