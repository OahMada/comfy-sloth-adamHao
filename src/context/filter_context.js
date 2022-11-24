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
		company: 'all',
		category: 'all',
		color: 'all',
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
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
	}, [products, state.sort, state.filters]);

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
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};
	var clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	return (
		<FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};
