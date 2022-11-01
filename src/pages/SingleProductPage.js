import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import reducer from '../reducers/products_reducer';
// import { GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_ERROR } from '../actions';
// import axios from 'axios';

// var initialState = {
// 	single_product_loading: false,
// 	single_product_error: false,
// 	single_product: {},
// };

const SingleProductPage = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	let {
		single_product_loading: loading,
		single_product_error: error,
		single_product: product,
		fetchSingleProduct,
		dispatch,
	} = useProductsContext();

	// var [state, dispatch] = useReducer(reducer, initialState);

	// var fetchSingleProduct = async (url) => {
	// 	dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
	// 	try {
	// 		let response = await axios.get(url);
	// 		let product = response.data;
	// 		dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
	// 	} catch (error) {
	// 		dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
	// 	}
	// };

	useEffect(() => {
		fetchSingleProduct(`${url}${id}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				navigate('/');
			}, 3000);
		}
		return () => {
			dispatch({ type: 'CLEAR_REMAINING_ERROR' });
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <Error />;
	}

	let { name, price, description, stock, stars, reviews, company, images } = product;
	return (
		<Wrapper>
			<PageHero title={name} product />
			<div className='section section-center page'>
				<Link to='/products' className='btn'>
					back to products
				</Link>
				<div className='product-center'>
					<ProductImages images={images} />
					<section>
						<h2>{name}</h2>
						<Stars stars={stars} reviews={reviews} />
						<h5 className='price'>{formatPrice(price)}</h5>
						<p className='desc'>{description}</p>
						<p className='info'>
							<span>available : </span>
							{stock > 0 ? 'in stock' : 'out of stock'}
						</p>
						<p className='info'>
							<span>ID : </span>
							{id}
						</p>
						<p className='info'>
							<span>brand : </span>
							{company}
						</p>
						<hr />
						{stock > 0 && <AddToCart product={product} />}
					</section>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
	}

	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`;

export default SingleProductPage;
