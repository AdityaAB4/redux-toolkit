import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // setProducts(state, action) {
    //   // Do not do this NEVER
    //   // const res = await fetch("https://fakestoreapi.com/products/");
    //   // We can't do any asynchronous call in reducers as reducers are synchronous
    //   //Reducers are pure functions they don't have any side-effects
    //   //For this purpose we use thunk middleware
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks
// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     // const prop = getState().property;
//     try {
//       const res = await fetch("https://fakestoreapi.com/products/");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

// Thunks another way
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const data = await res.json();
  return data;
});
