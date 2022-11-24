import { FaAcquisitionsIncorporated } from 'react-icons/fa';
import { GiStarSattelites } from 'react-icons/gi';
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
		let maxPrice = action.payload.reduce((acc, cur) => {
			if (cur.price > acc) {
				acc = cur.price;
			}
			return acc;
		}, 0);
		return {
			...state,
			all_products: [...action.payload],
			filtered_products: [...action.payload],
			load_products_loading: false,
			filters: {
				...state.filters,
				max_price: maxPrice,
				price: maxPrice,
			},
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
		let tempProducts = [...filtered_products];
		// 349 do we need a copy of filtered_products?
		if (sort === 'price-lowest') {
			tempProducts.sort((a, b) => a.price - b.price);
		}
		if (sort === 'price-highest') {
			tempProducts.sort((a, b) => b.price - a.price);
		}
		if (sort === 'name-a') {
			tempProducts.sort((a, b) => {
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
			tempProducts.sort((a, b) => {
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
		return { ...state, filtered_products: tempProducts };
	}
	if (action.type === UPDATE_FILTERS) {
		return {
			...state,
			filters: { ...state.filters, [action.payload.name]: action.payload.value },
		};
	}
	if (action.type === FILTER_PRODUCTS) {
		let {
			all_products,
			filters: { text, category, company, color, price, shipping },
		} = state;
		let filtered_products = [...all_products];
		if (text) {
			filtered_products = filtered_products.filter((product) => {
				return product.name.toLowerCase().includes(text);
			});
		}
		if (category !== 'all') {
			filtered_products = filtered_products.filter((product) => product.category === category);
		}
		if (company !== 'all') {
			filtered_products = filtered_products.filter((product) => product.company === company);
		}
		if (color !== 'all') {
			filtered_products = filtered_products.filter((product) => product.colors.includes(color));
		}
		filtered_products = filtered_products.filter((product) => product.price <= price);
		if (shipping) {
			filtered_products = filtered_products.filter((product) => product.shipping);
		}

		return { ...state, filtered_products };
	}

	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			filters: {
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.max_price,
				shipping: false,
			},
		};
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
