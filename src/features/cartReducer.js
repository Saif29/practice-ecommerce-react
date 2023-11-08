import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { value: [] },
    reducers: {
        cartAction: (state, action) => {
            {
                state.value = [...state.value, action.payload];
            }
        },
        removeItemAction: (state, action) => {
            let x = 0
            let y = 0
            state.value.map(p => {
                if(p.name===action.payload){
                    x = y
                }
                y++;
            });
            state.value.splice(x, 1);
        },
        emptyCartAction: (state, action) => {
            {
                state.value = [];
            }
        }
    },
});

export const { cartAction, removeItemAction, emptyCartAction } = cartSlice.actions;

export default cartSlice.reducer;
