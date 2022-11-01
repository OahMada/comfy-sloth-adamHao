import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
	isSidebarOpen: false,
	products_loading: false,
	products_error: false,
	products: [],
	featured_products: [],
	single_product_loading: false,
	single_product_error: false,
	single_product: {},
};

const ProductsContext = React.createContext(initialState);

export const ProductsProvider = ({ children }) => {
	var [state, dispatch] = useReducer(reducer, initialState);
	var openSidebar = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};

	var closeSidebar = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	var fetchProducts = async (url) => {
		dispatch({ type: GET_PRODUCTS_BEGIN });
		try {
			let response = await axios.get(url);
			let products = response.data;
			dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
		} catch (error) {
			dispatch({ type: GET_PRODUCTS_ERROR });
		}
	};

	var fetchSingleProduct = async (url) => {
		dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
		try {
			let response = await axios.get(url);
			let product = response.data;
			dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
		} catch (error) {
			dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
		}
	};

	useEffect(() => {
		fetchProducts(url);
	}, []);

	return (
		<ProductsContext.Provider value={{ openSidebar, closeSidebar, fetchSingleProduct, dispatch, ...state }}>
			{children}
		</ProductsContext.Provider>
	);
};
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext);
};
