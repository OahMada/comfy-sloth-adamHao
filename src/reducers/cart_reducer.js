import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions';

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		let { id, color, amount, product } = action.payload;

		let tempCart = [...state.cart];
		// get existing cart item index
		let cartItemIndex = tempCart.findIndex((item) => item.id === id + color);

		if (cartItemIndex !== -1) {
			let { amount: cartItemAmount, max: cartItemStock } = tempCart[cartItemIndex];

			cartItemAmount += amount;
			if (cartItemAmount > cartItemStock) {
				cartItemAmount = cartItemStock;
			}

			tempCart[cartItemIndex].amount = cartItemAmount;
			return { ...state, cart: tempCart };
		} else {
			let newCartItem = {
				id: id + color,
				name: product.name,
				color,
				amount,
				image: product.images[0].url,
				price: product.price,
				max: product.stock,
			};
			return { ...state, cart: [...state.cart, newCartItem] };
		}
	}
	if (action.type === REMOVE_CART_ITEM) {
		return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
	}
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		let { id, value } = action.payload;
		let tempCart = [...state.cart].filter((item) => {
			if (item.id === id) {
				if (value === 'increase') {
					item.amount += 1;
					if (item.amount > item.max) {
						item.amount = item.max;
					}
				}
				if (value === 'decrease') {
					item.amount -= 1;
					if (item.amount <= 0) {
						return false;
					}
				}
			}
			return true;
		});
		return { ...state, cart: tempCart };
	}
	if (action.type === COUNT_CART_TOTALS) {
		let { total_items, total_amount } = state.cart.reduce(
			(acc, cur) => {
				acc.total_amount += cur.amount * cur.price;
				acc.total_items += cur.amount;
				return acc;
			},
			{ total_items: 0, total_amount: 0 }
		);
		return { ...state, total_items, total_amount };
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
