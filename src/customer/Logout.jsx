import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export default function Logout() {
	let location = useLocation();

	useEffect(() => {
		localStorage.removeItem('cnpj_cpf');
		localStorage.removeItem('customer');
	}, []);

	return (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}