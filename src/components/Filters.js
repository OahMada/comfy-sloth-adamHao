import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
	var {
		filters: { text, company, category, color, max_price, min_price, price, shipping },
		updateFilters,
		clearFilters,
		all_products,
	} = useFilterContext();

	var categories = getUniqueValues(all_products, 'category');
	var colors = getUniqueValues(all_products, 'colors');
	let companiesArray = Array.from(company.keys()); // generate companies array to map on

	return (
		<Wrapper>
			<div className='content'>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className='form-control'>
						<input
							type='text'
							name='text'
							placeholder='search'
							className='search-input'
							value={text}
							onChange={updateFilters}
						/>
					</div>
					<div className='form-control'>
						<h5>category</h5>
						<div>
							{categories.map((item, index) => {
								return (
									<button
										key={index}
										className={`${item.toLowerCase() === category && 'active'}`}
										onClick={updateFilters}
										name='category'
										type='button'
										value={item}
									>
										{item}
									</button>
								);
							})}
						</div>
					</div>
					<div className='form-control'>
						<h5>company</h5>
						{/* <select name='company' className='company' value={company} onChange={updateFilters}>
							{companies.map((item, index) => {
								return (
									<option value={item} key={index}>
										{item}
									</option>
								);
							})}
						</select> */}
						{companiesArray.map((item, index) => {
							return (
								<div className='form-control shipping' key={index}>
									<input
										type='checkbox'
										name='company'
										value={item}
										onChange={updateFilters}
										id={item}
										checked={company.get(item)} // access company map entry value
									/>
									<label htmlFor={item}>{item}</label>
								</div>
							);
						})}
					</div>
					<div className='form-control'>
						<h5>colors</h5>
						<div className='colors'>
							{colors.map((item, index) => {
								return (
									<button
										name='color'
										type='button'
										data-color={item}
										key={index}
										onClick={updateFilters}
										style={{ backgroundColor: item }}
										className={
											item === 'all'
												? `all-btn ${item === color && 'active'}`
												: `color-btn ${item === color && 'active'}`
										}
									>
										{item === 'all' ? item : item === color && <FaCheck />}
									</button>
								);
							})}
						</div>
					</div>
					<div className='form-control'>
						<h5>price</h5>
						<p className='price'>{formatPrice(price)}</p>
						<input type='range' name='price' value={price} onChange={updateFilters} min={min_price} max={max_price} />
					</div>
					<div className='form-control shipping'>
						<label htmlFor='shipping'>free shipping</label>
						<input type='checkbox' name='shipping' id='shipping' onChange={updateFilters} checked={shipping} />
					</div>
				</form>
				<button type='button' onClick={clearFilters} className='clear-btn'>
					clear filters
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
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
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
		max-width: 200px;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

export default Filters;
