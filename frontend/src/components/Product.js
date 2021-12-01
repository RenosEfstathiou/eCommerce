import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <div className='my-3'>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>
          </Card.Text>

          <Card.Text as='h3' className='mt-1'>
            &#36;{product.price}
          </Card.Text>
        </Card.Body>

        <Card.Footer className='text-center'>
          {product.countInStock > 0 ? `${product.countInStock} Left in stock` : 'Out of stock'}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Product;
