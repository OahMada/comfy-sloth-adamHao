import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';
import Loading from './Loading';

const ProductList = () => {
	var { paginated_products: products, grid_view, load_products_loading } = useFilterContext();

	if (load_products_loading) {
		return <Loading />;
	}
	if (products.length < 1 && !load_products_loading) {
		return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search</h5>;
	}
	if (!grid_view) {
		return <ListView products={products} />;
	}
	return <GridView products={products} />;
};

export default ProductList;
