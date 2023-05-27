// store.js
import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    count: 0,
    cart: [],
    // sub_total:[],
    total: [],
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    increment: (state, action) => {
      let data = [...state.items];

      let ind = data.findIndex(
        (product) =>
          parseInt(product.product_id) === parseInt(action.payload.product_id)
      );
      if (ind > -1) {
        data[ind].qty += 1;
      }
    },
    decrement: (state, action) => {
      let data = [...state.items];

      let ind = data.findIndex(
        (product) =>
          parseInt(product.product_id) === parseInt(action.payload.product_id)
      );
      if (ind > -1 && data[ind].qty > 1) {
        data[ind].qty -= 1;
      }
    },
    addToCart: (state, action) => {
      let data = [...state.items];
      if (action.payload.product.view_status === 0) {
        let ind = data.findIndex(
          (product) =>
            parseInt(product.product_id) ===
            parseInt(action.payload.product.product_id)
        );
        if (ind > -1) {
          data[ind].view_status = 1;
          state.count += 1;

          const { name, img_path, price, qty, product_id } =
            action.payload.product;
          let sub_total = parseInt(price.substring(1) * qty);
          state.cart = [
            ...state.cart,
            { name, img_path, price, qty, product_id, sub_total },
          ];
        }
      }
    },
    removeCart: (state, action) => {
      state.cart.splice(action.payload.i, 1);
    },
    cartQtyIncrese: (state, action) => {
      let data = [...state.cart];

      let ind = data.findIndex(
        (product) => parseInt(product.product_id) === parseInt(action.payload)
      );
      if (ind > -1) {
        data[ind].qty += 1;
      }
    },
    cartQtyDecrese: (state, action) => {
      console.log(action.payload, "log");
      let data = [...state.cart];

      let ind = data.findIndex(
        (product) => parseInt(product.product_id) === parseInt(action.payload)
      );
      if (ind > -1 && data[ind].qty > 1) {
        data[ind].qty -= 1;
      }
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addToCart,
  increment,
  decrement,
  removeCart,
  cartQtyIncrese,
  cartQtyDecrese,
} = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    let response = await axios.post(
      "http://cbe.themaestro.in/ksnm/webservice/allproductlistforsearch"
    );
    let refRes = [...response.data.products_list];
    refRes = refRes.map((ele) => {
      return {
        ...ele,
        view_status: 0,
        qty: 1,
      };
    });
    dispatch(fetchProductsSuccess(refRes));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export default configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});
