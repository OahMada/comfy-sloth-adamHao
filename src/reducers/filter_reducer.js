import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
	PRODUCT_PAGINATION,
	UPDATE_PAGE,
} from '../actions';
import { getUniqueValues } from '../utils/helpers';

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = action.payload.reduce((acc, cur) => {
			if (cur.price > acc) {
				acc = cur.price;
			}
			return acc;
		}, 0);

		let companiesArray = getUniqueValues(action.payload, 'company').slice(1); // 'all' is not needed anymore
		let companiesMap = new Map(companiesArray.map((item) => [item, true])); // generate initial company filter state Map with all of the companies checked

		return {
			...state,
			all_products: [...action.payload],
			filtered_products: [...action.payload],
			load_products_loading: false,
			filters: {
				...state.filters,
				max_price: maxPrice,
				price: maxPrice,
				company: companiesMap,
			},
		};
	}
	if (action.type === SET_GRIDVIEW) {
		return {
			...state,
			grid_view: true,
			products_per_page: 9,
		};
	}
	if (action.type === SET_LISTVIEW) {
		return {
			...state,
			grid_view: false,
			products_per_page: 6,
		};
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
		let tempCompany = new Map(state.filters.company); // make a copy because Maps like arrays and objects
		if (action.payload.name === 'company') {
			tempCompany.set(action.payload.value, action.payload.checked); // update checked state
		}

		return {
			...state,
			filters: { ...state.filters, [action.payload.name]: action.payload.value, company: tempCompany },
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

		if (color !== 'all') {
			filtered_products = filtered_products.filter((product) => product.colors.includes(color));
		}
		filtered_products = filtered_products.filter((product) => product.price <= price);
		if (shipping) {
			filtered_products = filtered_products.filter((product) => product.shipping);
		}
		// base on the checked state of companies, filter the products
		for (let entry of company) {
			if (!entry[1]) {
				filtered_products = filtered_products.filter((product) => {
					return product.company !== entry[0];
				});
			}
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
	// responsible for displaying paginated_products
	if (action.type === PRODUCT_PAGINATION) {
		let { filtered_products, page_number, products_per_page, first_on_page } = state;

		// calculate the max page number
		let firstHalfProducts = filtered_products.slice(0, first_on_page);
		let latterHalfProducts = filtered_products.slice(first_on_page);

		let max_page_number =
			Math.ceil(firstHalfProducts.length / products_per_page) +
			Math.ceil(latterHalfProducts.length / products_per_page);

		let newPageNumber = Math.ceil(firstHalfProducts.length / products_per_page) + 1;

		if (max_page_number === 0) {
			max_page_number = 1; // keep page_number above 0. otherwise when there's no product, page number become 0 and stays at 0
		}
		if (page_number > max_page_number) {
			newPageNumber = max_page_number; // update page_number if there isn't that much pages
		}

		// show products are belong to current page
		let paginated_products = filtered_products.slice(first_on_page, first_on_page + products_per_page);

		return {
			...state,
			paginated_products,
			max_page_number,
			products_per_page,
			first_on_page,
			page_number: newPageNumber,
		};
	}
	// handle actions when clicked on page number and prev/next button
	// responsible for calculating new page number and new first on page product
	if (action.type === UPDATE_PAGE) {
		let { filtered_products, page_number, max_page_number, products_per_page, first_on_page } = state;
		let newPageNumber, newFirstOnPage;

		if (action.payload === 'prev') {
			newPageNumber = page_number - 1;
			newFirstOnPage = first_on_page - products_per_page;
			if (newFirstOnPage < 0) {
				newFirstOnPage = 0;
			}
			if (page_number < 1) {
				newPageNumber = 1;
			}
		} else if (action.payload === 'next') {
			newPageNumber = page_number + 1;
			newFirstOnPage = first_on_page + products_per_page;

			// page may grow
			if (newFirstOnPage > filtered_products.length - 1) {
				newFirstOnPage = first_on_page;
			}

			if (newPageNumber > max_page_number) {
				newPageNumber = max_page_number;
			}
		} else {
			newPageNumber = Number(action.payload); // page number fetched from dataset property is string
			let pageDifference = Number(action.payload) - page_number;
			newFirstOnPage = first_on_page + pageDifference * products_per_page;
			if (newFirstOnPage < 0) {
				newFirstOnPage = 0;
			}
			if (newFirstOnPage > filtered_products.length - 1) {
				newFirstOnPage = first_on_page;
			}
		}
		return {
			...state,
			page_number: newPageNumber,
			first_on_page: newFirstOnPage,
		};
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
