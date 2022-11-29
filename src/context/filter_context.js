import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
	UPDATE_PAGE,
	PRODUCT_PAGINATION,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
	load_products_loading: true,
	filtered_products: [],
	all_products: [],
	grid_view: true,
	sort: 'price-lowest',
	filters: {
		text: '',
		company: new Map(), // just for fun
		category: 'all',
		color: 'all',
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
	// states for pagination
	paginated_products: [],
	page_number: 1,
	max_page_number: 0,
	products_per_page: 9,
	first_on_page: 0,
};

const FilterContext = React.createContext(initialState);

export const FilterProvider = ({ children }) => {
	var [state, dispatch] = useReducer(reducer, initialState);

	var { products } = useProductsContext();

	useEffect(() => {
		if (products.length < 1) {
			return;
		}
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	useEffect(() => {
		if (products.length < 1) {
			return;
		}
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS }); // why not working anymore? because filter would return another set of filtered products, make the sort effect disappear
		dispatch({ type: PRODUCT_PAGINATION }); // perform pagination after done filtering and sorting
	}, [products, state.sort, state.filters, state.page_number, state.grid_view]); // the last two for changing page and displaying different amounts of products in different view mode to work

	var setGridView = () => {
		dispatch({ type: SET_GRIDVIEW });
	};

	var setListView = () => {
		dispatch({ type: SET_LISTVIEW });
	};

	var updateSort = (e) => {
		let value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	var updateFilters = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		// if (name === 'category') {
		// 	value = e.target.textContent;
		// }

		if (name === 'color') {
			value = e.target.dataset.color;
		}
		if (name === 'price') {
			// value = Number(value);
		}
		if (name === 'shipping') {
			value = e.target.checked;
		}
		// have to pass along checked state to control checkbox checked state
		if (name === 'company') {
			let checked = e.target.checked;
			dispatch({ type: UPDATE_FILTERS, payload: { name, value, checked } });
			return;
		}
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};
	var clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	var updatePage = (e) => {
		let page = e.target.dataset.page;
		dispatch({ type: UPDATE_PAGE, payload: page });
	};

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
				clearFilters,
				updatePage,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};

/**
advanced pagination
## where pagination involved
1, initial pagination load => page_number, grid_view
2, when clicking display mode btn => grid_view, paginated_products, products_per_page
3, when click on page button
## related state value
1, paginated_products
2, page_number,
3, max_page_number
4, products_per_page
5, first_on_page
 */
