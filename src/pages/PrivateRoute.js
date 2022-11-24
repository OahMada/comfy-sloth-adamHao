import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later

const PrivateRoute = ({ children }) => {
	let { user } = useAuth0();
	if (!user) {
		return <Navigate to='/' />;
	}
	return children;
};
export default PrivateRoute;
