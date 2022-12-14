import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product }) => {
	let { id, stock, colors } = product;

	var { addToCart } = useCartContext();
	let [colorIndex, setColorIndex] = useState(0);
	let [amount, setAmount] = useState(1);

	let increase = () => {
		setAmount((prevAmount) => {
			if (prevAmount + 1 > stock) {
				return stock;
			}
			return prevAmount + 1;
		});
	};

	let decrease = () => {
		setAmount((prevAmount) => {
			if (prevAmount - 1 <= 0) {
				return 1;
			}
			return prevAmount - 1;
		});
	};

	return (
		<Wrapper>
			<div className='colors'>
				<span>colors : </span>
				<div>
					{colors.map((color, index) => {
						return (
							<button
								key={index}
								className={`color-btn ${colorIndex === index && 'active'}`}
								style={{ background: color }}
								onClick={() => setColorIndex(index)}
							>
								{colorIndex === index && <FaCheck />}
							</button>
						);
					})}
				</div>
			</div>
			<div className='btn-container'>
				<AmountButtons amount={amount} increase={increase} decrease={decrease} />
				<button className='btn' type='button' onClick={() => addToCart(id, colors[colorIndex], amount, product)}>
					add to cart
				</button>
				<Link to='/cart' className='btn'>
					check cart
				</Link>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 2rem;
	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;
		span {
			text-transform: capitalize;
			font-weight: 700;
		}
		div {
			display: flex;
		}
	}
	.color-btn {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.75rem;
			color: var(--clr-white);
		}
	}
	.active {
		opacity: 1;
	}
	.btn-container {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`;
export default AddToCart;
