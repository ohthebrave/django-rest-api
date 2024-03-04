import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalAmount, clearAllCart, removeItem } from '../features/carts/cartSlice';
import "../cssModules/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state?.carts);
  const { cartTotalAmount }= useSelector(state => state?.carts)

  // empty the cart 
  const handleClearCart = () => {
    dispatch(clearAllCart());
  };

  // remove the cart
  const handleRemoveFromCart = (product) => {
    dispatch(removeItem(product));
  };

  // calculate subtotal each time the cart item changes
  useEffect(() => {
    dispatch(calculateTotalAmount())
  }, [cartItems, dispatch])


  return (
    <div className="cart-container">
    <h2>Animal Cart</h2>
    {cartItems.length === 0 ? (
      <div className="cart-empty">
        <p>Your cart is currently empty</p>
        <div className="start-shopping">
          <Link to="/animal-list">
          <FaArrowLeft />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        
        <div className="cart-items">
          {cartItems &&
            cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem?.product?.id}>
                <div className="cart-product">
                  <img src={cartItem?.product?.image_url} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem?.product?.breed}</h3>
  
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem?.product?.price}</div>
                <div className="cart-product-quantity">
                  <button >
                    
                  </button>
                  <div className="count">1</div>
                  <button></button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem?.product?.price * cartItem.qty}
                </div>
              </div>
            ))}
        </div>
        <div className="cart-summary">
          <button className="clear-btn" onClick={() => handleClearCart()}>
            Clear Cart
          </button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">${cartTotalAmount}</span>
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            <Link to="/checkout" className="btn btn-secondary">checkout</Link>
            <div className="continue-shopping">
              <Link to="/animal-list">  
              <FaArrowLeft />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default Cart

