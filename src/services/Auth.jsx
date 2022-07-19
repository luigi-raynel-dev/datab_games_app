import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export function UnrequireAuth({ children }) {
  let location = useLocation();

  if (localStorage.getItem('cnpj_cpf') === null) {
    return children;
  }
  return <Navigate to="/customer" state={{ from: location }} replace />;
}

export function RequireAuth({ children }) {
  let location = useLocation();

  if (localStorage.getItem('cnpj_cpf') !== null) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}