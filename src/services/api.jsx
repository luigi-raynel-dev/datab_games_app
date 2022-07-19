import axios from "axios";

export function api(navigate, addToast) {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: 'Bearer '+localStorage.getItem('cnpj_cpf')
    }
  });

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem('cnpj_cpf');
        localStorage.removeItem('customer');
        addToast({
          content: 'Sua sessão expirou.',
          date: new Date()
        })
        navigate('customer/logout')
      }
      return error
    }
  );

  return api
}