import React, { useEffect } from 'react';
import { calculateTotalAmount } from '../features/carts/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const OrderItems = () => {

    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state?.carts);
    const { cartTotalAmount }= useSelector(state => state?.carts)

    // calculate subtotal each time the cart item changes
    useEffect(() => {
        dispatch(calculateTotalAmount())
    }, [cartItems, dispatch])

  return (
    <div>
        <div className="cart-container">
    <h2>Order Item</h2>
    {cartItems.length === 0 ? (
      <div className="cart-empty">
        <div className="start-shopping">
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
                    <h3 className='p-3'>{cartItem?.product?.breed}</h3>
                  </div>
                </div>
                
               
                <div className="cart-product-total-price">
                  ${cartItem?.product?.price * cartItem.qty}
                </div>
              </div>
            ))}
        </div>
        <div className="cart-summary">
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Total Amount</span>
              <span className="amount">${cartTotalAmount}</span>
            </div>
            <div className="continue-shopping">
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
    </div>
  )
}

export default OrderItems