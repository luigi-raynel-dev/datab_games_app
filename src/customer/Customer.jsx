import React from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Logout from './Logout';
import Orders from './Orders';

export default function Customer() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="" element={<Orders />} />
          <Route path="order" element={<Orders />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <>
      <Navbar key='sm' bg="light" expand='sm' className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="">{process.env.REACT_APP_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 align-items-center pe-3">
                <Nav.Link as={Link} to="order">Pedidos</Nav.Link>
                <Nav.Item>Olá, {localStorage.getItem("customer")}! 👋</Nav.Item>
              </Nav>
              <Nav className="flex-grow-1 justify-content-end">
                <Nav.Link as={Link} to="logout">Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container>
        {/* Conteúdo das rotas */}
        <Outlet />
      </Container>
    </>
  );
}