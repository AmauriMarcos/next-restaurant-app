import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        total: 0
    },
    reducers: {
        addProduct: (state, action) =>{
            state.products.push(action.payload);
            state.total += action.payload.burgerPrice * action.payload.burgerQtd
           
        },
        removeProduct: (state,action) =>{
            state.products = state.products.filter((product) => product.id !== action.payload.id)
            state.total = state.total - action.payload.burgerTotal
        },
        reset: (state) =>{
            state = initialState
        }
    }
});

export const {addProduct, removeProduct, reset} = cartSlice.actions;
export default cartSlice.reducer;