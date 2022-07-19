import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './login/Login';
import Customer from './customer/Customer';
import Toast from './component/Toast';
import { RequireAuth, UnrequireAuth } from './services/Auth';

export const ToastContext = createContext();

export default function Router() {

  const [toast, setToast] = useState([])
  const addToast = (add_toast) => { setToast([...toast, add_toast]) }

  return (
    <>
      <ToastContext.Provider value={addToast}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="*" element={
              <UnrequireAuth>
                <Routes>
                  <Route path="" element={<Login />} />
                  <Route path="login" element={<Login />} />
                </Routes>
              </UnrequireAuth>
            } />
            <Route path="customer/*" element={
              <RequireAuth>
                <Customer />
              </RequireAuth>
            } />
          </Routes>
        </BrowserRouter>
      </ToastContext.Provider>
      <Toast toast={toast} setToast={setToast} />
    </>
  );
}