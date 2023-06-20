import { createSlice } from "@reduxjs/toolkit";
// import { purgePersistedState } from "./store";

const initialState = {
    products: [],
    quantity: 0,
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
        },
        reset: (state) => {
            return initialState
        }
    }
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;