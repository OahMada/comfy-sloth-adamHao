import { useFilterContext } from '../context/filter_context';
import styled from 'styled-components';

var Pagination = () => {
	let { updatePage, max_page_number: max, page_number } = useFilterContext();

	let pageButtonArray = [];

	for (let index = 0; index < max; index++) {
		pageButtonArray.push(
			<button
				type='button'
				key={index}
				onClick={updatePage}
				data-page={index + 1}
				className={page_number === index + 1 ? 'btn active' : 'btn'}
			>
				{index + 1}
			</button>
		);
	}

	return (
		<Wrapper>
			<button type='button' onClick={updatePage} data-page='prev' className='btn'>
				prev
			</button>
			{pageButtonArray}
			<button type='button' onClick={updatePage} data-page='next' className='btn'>
				next
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 2rem;
	display: flex;
	align-items: center;
	justify-content: end;
	flex-wrap: wrap;
	gap: 0.5rem;
	.active {
		color: var(--clr-primary-1);
		background: var(--clr-primary-7);
	}
`;

export default Pagination;
