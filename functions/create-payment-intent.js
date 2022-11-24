require('dotenv').config();
var stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
	if (event.body) {
		var { shipping_fee, total_amount } = JSON.parse(event.body);

		var calculateOrderAmount = () => {
			return shipping_fee + total_amount;
		};

		try {
			let paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(),
				currency: 'usd',
			});
			return {
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: error.message }),
			};
		}
	}
	return {
		statusCode: 200,
		body: 'Create Payment Intent',
	};
};
