import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import { ADD_TO_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS } from '../actions';

var getLocalStorage = () => {
	if (localStorage.getItem('cart')) {
		return JSON.parse(localStorage.getItem('cart'));
	} else return [];
};

const initialState = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 534,
};

const CartContext = React.createContext(initialState);

export const CartProvider = ({ children }) => {
	var [state, dispatch] = useReducer(reducer, initialState);

	var addToCart = (id, color, amount, product) => {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	};

	var removeItem = (id) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: id });
	};

	var toggleAmount = (id, value) => {
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
	};

	var clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart));
		dispatch({ type: COUNT_CART_TOTALS });
	}, [state.cart]);
	// why state not work?

	return (
		<CartContext.Provider value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};
// make sure use
export const useCartContext = () => {
	return useContext(CartContext);
};
