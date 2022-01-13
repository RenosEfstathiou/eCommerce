import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Componetns
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// Actions
import { register, clearRegisterError } from '../actions/userActions';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // destructuring redux state
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '';

  useEffect(() => {
    if (message) {
      setMessage(null);
    }

    if (userInfo) {
      navigate(`/${redirect}`);
    }

    return function cleanup() {
      dispatch(clearRegisterError());
    };
  }, [navigate, redirect, userInfo]);

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      // Dispatch register
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className='rounded'
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2' controlId='Email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            className='rounded'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className='rounded'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className='rounded'
            type='password'
            placeholder='Enter confirmation password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button className='mb-2 rounded' variant='primary' type='submit'>
          Register
        </Button>
      </Form>

      <Row>
        <Col>
          Already registered? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log in</Link>.
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
