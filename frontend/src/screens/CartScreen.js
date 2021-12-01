import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message.js';
import { addToCart, removeFromCart, clearCart } from '../actions/cartActions.js';

const CartScreen = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();

  const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = productId => {
    dispatch(removeFromCart(productId));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping', { replace: true });
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            You cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row className='text-center align-items-center'>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={4}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>{item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      className='rounded'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash text-danger'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>$
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to checkout
              </Button>

              <Button className='btn-block' variant='link' disabled={cartItems.length === 0} onClick={clearCartHandler}>
                Clear Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
