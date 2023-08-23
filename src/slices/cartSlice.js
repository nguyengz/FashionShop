import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
const initialState ={
    cartItems: localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity: 0,
    cartTotalAmout:0,
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state,action){
           const itemIndex = state.cartItems.findIndex((item)=>item.product_id === action.payload.product_id); 
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity +=1;
                toast.info(`increased ${state.cartItems[itemIndex].product_name} cart quantity`,{
                    position:"bottom-left",
                });
            } else {
                const tempProduct = {...action.payload,cartQuantity:1};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.product_name} added to cart`,{
                    position:"bottom-left",
                });
        
            }
         localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        removeFromCart(state,action){
            const nextCartItems=state.cartItems.filter(
                cartItem => cartItem.product_id !== action.payload.product_id
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            toast.error(`${action.payload.product_name} đã xóa `,{
                position:"bottom-left",
            });
        },
    },

});
export const {addToCart,removeFromCart } = cartSlice.actions;   
export default cartSlice.reducer; 