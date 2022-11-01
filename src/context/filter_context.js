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
	// loading: true,
	filtered_products: [],
	all_products: [],
	grid_view: true,
	sort: 'price-lowest',
};

const FilterContext = React.createContext(initialState);

export const FilterProvider = ({ children }) => {
	var [state, dispatch] = useReducer(reducer, initialState);

	var { products } = useProductsContext();
	console.log(products);

	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	useEffect(() => {
		dispatch({ type: SORT_PRODUCTS });
	}, [products, state.sort]);

	var setGridView = () => {
		dispatch({ type: SET_GRIDVIEW });
	};

	var setListView = () => {
		dispatch({ type: SET_LISTVIEW });
	};

	var updateSort = (e) => {
		// let name = e.target.name;
		let value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	return (
		<FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort }}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};