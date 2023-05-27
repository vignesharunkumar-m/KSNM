import React from "react";
import classes from "./cart.module.css";

import { removeCart, cartQtyIncrese, cartQtyDecrese } from "./store";

import { useSelector, useDispatch } from "react-redux";

function Cartproducts() {
  const cartItems = useSelector((state) => state.products.cart);

  const dispatch = useDispatch();

  const cartRemove = (i) => {
    dispatch(removeCart({ i }));
  };

  const cartIncreseQty = (product_id) => {
    dispatch(cartQtyIncrese(product_id));
  };
  const cartDecreseQty = (product_id) => {
    dispatch(cartQtyDecrese(product_id));
  };

  return (
    <div>
      {cartItems.map((ele, i) => {
        return (
          <div key={i} className={classes.main}>
            <img src={ele.img_path}></img>
            <div className={classes.detail}>
              <div>{ele.name}</div>
              <div>{ele.price}</div>
              <div className={classes.qty}>
                <button onClick={() => cartDecreseQty(ele.product_id)}>
                  -
                </button>
                <span>{ele.qty}</span>
                <button onClick={() => cartIncreseQty(ele.product_id)}>
                  +
                </button>
              </div>
              <div>
                sub_Total:<span>₹{ele.price.substring(1) * ele.qty}.00</span>
              </div>
            </div>
            <div className={classes.remove}>
              <button onClick={() => cartRemove(i)}>Remove To Cart</button>
            </div>
          </div>
        );
      })}
      <div>
        Total: ₹
        {cartItems.reduce((total, ele) => {
          const subtotal = ele.price.substring(1) * ele.qty;
          return total + subtotal;
        }, 0)}
        .00
      </div>
    </div>
  );
}

export default Cartproducts;
