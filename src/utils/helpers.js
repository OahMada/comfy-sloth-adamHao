export const formatPrice = (number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(number / 100);
};

export const getUniqueValues = (data, type) => {
	var uniqueSet = new Set(
		data.reduce((acc, item) => {
			if (Array.isArray(item[type])) {
				acc = [...acc, ...item[type]];
			} else {
				acc.push(item[type]);
			}
			return acc;
		}, [])
	);
	return ['all', ...uniqueSet];

	/**
	 * let unique = data.map((item) => item[type]);
	 * if(type === colors) {
	 * unique = unique.flat()
	 * }
	 */
};
