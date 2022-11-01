import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		return {
			...state,
			all_products: [...action.payload],
			filtered_products: [...action.payload],
			// loading: false
		};
	}
	if (action.type === SET_GRIDVIEW) {
		return { ...state, grid_view: true };
	}
	if (action.type === SET_LISTVIEW) {
		return { ...state, grid_view: false };
	}
	if (action.type === UPDATE_SORT) {
		return { ...state, sort: action.payload };
	}
	if (action.type === SORT_PRODUCTS) {
		let { sort, filtered_products } = state;
		// 349 do we need a copy of filtered_products?
		if (sort === 'price-lowest') {
			filtered_products.sort((a, b) => a.price - b.price);
		}
		if (sort === 'price-highest') {
			filtered_products.sort((a, b) => b.price - a.price);
		}
		if (sort === 'name-a') {
			filtered_products.sort((a, b) => {
				// if (a.name > b.name) {
				// 	return 1;
				// }
				// if (a.name < b.name) {
				// 	return -1;
				// }
				// return 0;
				return a.name.localeCompare(b.name);
			});
		}
		if (sort === 'name-z') {
			filtered_products.sort((a, b) => {
				// if (a.name > b.name) {
				// 	return -1;
				// }
				// if (a.name < b.name) {
				// 	return 1;
				// }
				// return 0;
				return b.name.localeCompare(a.name);
			});
		}
		return { ...state };
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
