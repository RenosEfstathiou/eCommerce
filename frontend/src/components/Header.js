import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            ReCommerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart {cartItems.length > 0 ? `(${cartItems.length})` : ``}
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                <i className='fas fa-user'></i> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
