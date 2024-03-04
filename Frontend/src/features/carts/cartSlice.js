import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    // ADD TO CART
    addToCart: (state, action) => {
        // console.log(action.payload.product)

        //if it exists in the cart
        const existingCartProductIndex= state.cartItems.findIndex(item => item?.product?.id === action.payload?.product?.id)

        if(existingCartProductIndex >= 0){
            state.cartItems[existingCartProductIndex].qty += 1;
            
        }else {
            // add a new product to cartItems
            let assembledItem;

            assembledItem= {...action.payload, qty: 1};
            // console.log(assembledItem)
            state.cartItems.push(assembledItem)
        }
        // set to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

    }, 

    // CLEAR CART ITEMS
    clearAllCart: (state, action) => {
        state.cartItems= [];
        // set to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // REMOVE CART ITEM
    removeItem: (state, action) => {
        const removeCartItem = state.cartItems.filter(item => item?.product?.id !== action.payload?.product?.id)

        state.cartItems = removeCartItem;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    calculateTotalAmount: (state, action) => {
        const sumTotal = state.cartItems?.reduce((acc, item) => acc + (item.product?.price * item.qty), 0);
        state.cartTotalAmount= Number(sumTotal);
    },


    incrementQty: (state, action) => {
        const existingCartProductIndex = state.cartItems.findIndex(item => item?.product?.id === action.payload?.product?.id)

        // if the item exists in cart then increase qty by 1
        if (existingCartProductIndex >= 0){
            state.cartItems[existingCartProductIndex].qty += 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    },


    decrementQty: (state, action) => {
        const existingCartProductIndex = state.cartItems.findIndex(item => item?.product?.id === action.payload?.product?.id)

        // if the item exists in cart then increase qty by 1
        if (existingCartProductIndex >= 0){
            state.cartItems[existingCartProductIndex].qty -= 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        } 
        // if the qty ===0 then remove the item from the cart 
        if(state.cartItems[existingCartProductIndex].qty === 0) {
            // state.cartItems.splice(existingCartProductIndex, 1);
            const filteredItems = state.cartItems?.filter(item => item?.product?.id !== action.payload?.product?.id)
            state.cartItems= filteredItems;

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    },
  }
})

export const {addToCart, clearAllCart, removeItem, incrementQty, decrementQty, calculateTotalAmount} = cartSlice.actions;

export default cartSlice.reducer;

