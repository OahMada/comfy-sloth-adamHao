import { useFilterContext } from '../context/filter_context';

var Pagination = () => {
	let { updatePage, max_page_number: max } = useFilterContext();

	let pageButtonArray = [];

	for (let index = 0; index < max; index++) {
		pageButtonArray.push(
			<button type='button' key={index} onClick={updatePage} data-page={index + 1}>
				{index + 1}
			</button>
		);
	}

	return (
		<div>
			<button type='button' onClick={updatePage} data-page='prev'>
				prev
			</button>
			{pageButtonArray}
			<button type='button' onClick={updatePage} data-page='next'>
				next
			</button>
		</div>
	);
};

export default Pagination;
